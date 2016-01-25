import fakeAjax from '../fakeAjax';

function onError(error) {
  console.error('Error: ', error);
}

fakeAjax('geeks.com/cartman', (character) => {
  let imdbProfile;
  let imdbFilms;

  function getQuotesIfDone() {
    if (imdbProfile && imdbFilms) {
      Object.assign(character, imdbProfile, {films: imdbFilms});

      if (character.quotesCount > 0) {
        fakeAjax(character.imdbUrl + '/quotes', (quotes) => {
          Object.assign(character, {quotes});
          console.log(character);
        }, onError);

      } else {
        console.log(character);
      }
    }
  }

  fakeAjax(character.imdbUrl, (profile) => {
    imdbProfile = profile;
    getQuotesIfDone();
  }, onError);

  fakeAjax(character.imdbUrl + '/films', (films) => {
    imdbFilms = films;
    getQuotesIfDone();
  }, onError);

}, onError)
