import fakeAjax from '../fakeAjaxAsPromise';

function fetchCharacter(url) {
  return fakeAjax(url)

    .then((character) => {
      return Promise.all([
        fakeAjax(character.spdbUrl + '/friends'),
        fakeAjax(character.spdbUrl + '/record')
      ]).then(([friends, criminalRec]) => {
        return Object.assign(character, {friends, criminalRec});
      });
    })

    .then((character) => {
      if (character.friends < 2 && character.criminalRec !== null) {
        console.log('Friends: %s. CR: %s  => infamous!\n', character.friends, character.criminalRec);
        return fakeAjax(character.spdbUrl + '/known_for')
          .then((knownFor) => Object.assign(character, {knownFor}));
      }
      return character;
    });
}

fetchCharacter('imdb.com/cartman')
  .then((eric) => console.log(eric))
  .catch((error) => console.error('Error: %s', error));
