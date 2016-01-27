import fakeAjax from '../fakeAjax';
import thunks from 'thunks';

const thunk = thunks();

// node style required
const thunkedAjax = thunk.thunkify(function (url, callback) {
  return fakeAjax(url,
    response => callback(null, response),
    response => callback(response)
  );
});

const fetchCharacter = thunk.thunkify(function (url, callback) {
  let friendsFetched = false;
  let recordFetched  = false;

  const getImdbProfile = thunkedAjax(url);

  getImdbProfile((error, character) => {
    function getKnownForIfInfamous() {
      if (!friendsFetched || !recordFetched) {
        return;
      }
      if (character.friends < 2 && character.criminalRec) {
        console.log('Friends: %s. CR: %s  => infamous!\n', character.friends, character.criminalRec);
        const getKnownFor = thunkedAjax(character.spdbUrl + '/known_for');
        getKnownFor((error, knownFor) => {
          if (error) {
            callback(error);
          } else {
            Object.assign(character, {knownFor});
            callback(null, character);
          }
        });
      } else {
        callback(null, character);
      }
    }

    const getFriends = thunkedAjax(character.spdbUrl + '/friends');

    getFriends((error, friends) => {
      if (error) {
        return callback(error);
      }
      friendsFetched = true;
      Object.assign(character, {friends});
      getKnownForIfInfamous();
    });

    const getRecord = thunkedAjax(character.spdbUrl + '/record');

    getRecord((error, criminalRec) => {
      if (error) {
        return callback(error);
      }
      recordFetched = true;
      Object.assign(character, {criminalRec});
      getKnownForIfInfamous();
    });

  });
});

const fetchCartman = fetchCharacter('imdb.com/cartman');

fetchCartman((error, eric) => {
  if (error) {
    console.error('Error: %s', error);
  } else {
    console.log(eric);
  }
});
