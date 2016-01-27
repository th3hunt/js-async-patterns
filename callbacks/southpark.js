import fakeAjax from '../fakeAjax';

function fetchCharacter(url, onSuccess, onError) {
  let friendsFetched = false;
  let recordFetched  = false;

  fakeAjax(url, (character) => {

    function getKnownForIfInfamous() {
      if (!friendsFetched || !recordFetched) {
        return;
      }
      if (character.friends < 2 && character.criminalRec) {
        console.log('Friends: %s. CR: %s  => infamous!\n', character.friends, character.criminalRec);
        fakeAjax(character.spdbUrl + '/known_for',
          (knownFor) => {
            Object.assign(character, {knownFor});
            onSuccess(character);
          },
          (error) => onError('customized error', error)
        );
      } else {
        onSuccess(character);
      }
    }

    // What happens if both calls below fail?

    fakeAjax(character.spdbUrl + '/friends', (friends) => {
      Object.assign(character, {friends});
      friendsFetched = true;
      getKnownForIfInfamous();
    }, onError);

    fakeAjax(character.spdbUrl + '/record', (criminalRec) => {
      Object.assign(character, {criminalRec});
      recordFetched = true;
      getKnownForIfInfamous();
    }, onError);

  }, onError);

}

fetchCharacter('imdb.com/cartman',
  (eric) => console.log(eric),
  (error) => console.error('Error: %s', error)
);
