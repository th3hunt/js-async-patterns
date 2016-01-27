import fakeAjax from '../fakeAjax';
import csp from 'js-csp';

function fakeAjaxAsChannel(url) {
  const ch = csp.chan();
  fakeAjax(url,
    response => csp.putAsync(ch, response),
    response => csp.putAsync(ch, new Error(response))
  );
  return ch;
}

// a csp.tryToTake(channel) which would throw if the value
// returned from the channel was an Error
// would make this method unnecessary
// Check http://swannodette.github.io/2013/08/31/asynchronous-error-handling/
function throwIfError(obj) {
  if (obj instanceof Error) {
    throw obj;
  }
}

function* fetchCharacter(url) {
  try {
    const character = yield csp.take(fakeAjaxAsChannel(url));

    throwIfError(character);

    function* fetchFriends() {
      return yield fakeAjaxAsChannel(character.spdbUrl + '/friends');
    }

    function* fetchRecord() {
      return yield fakeAjaxAsChannel(character.spdbUrl + '/record');
    }

    const [friendsChannel, recordChannel] = [csp.go(fetchFriends), csp.go(fetchRecord)];

    const friends = yield csp.take(friendsChannel);
    const criminalRec = yield csp.take(recordChannel);

    throwIfError(friends);
    throwIfError(criminalRec);

    Object.assign(character, {
      friends, criminalRec
    });

    if (friends < 2 && criminalRec) {
      console.log('Friends: %s. CR: %s  => infamous!\n', friends, criminalRec);
      const knownFor = yield csp.take(fakeAjaxAsChannel(character.spdbUrl + '/known_for'));
      Object.assign(character, {
        knownFor
      });
    }

    return character;

  } catch (error) {
    return error;
  }
}

const characterChannel = csp.spawn(fetchCharacter('imdb.com/cartman'));

csp.takeAsync(characterChannel, (eric) => {
  if (eric instanceof Error) {
    console.error(eric.stack);
  } else {
    console.log(eric);
  }
});
