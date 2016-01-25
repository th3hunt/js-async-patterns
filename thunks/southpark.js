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

function onError(error) {
  console.error('Error: ', error);
}

const getCartman = thunkedAjax('geeks.com/cartman');

getCartman((error, character) => {
  let profileFetched;
  let filmsFetched;

  function getQuotesIfDone() {
    if (profileFetched && filmsFetched) {
      if (character.quotesCount > 0) {
        const getQuotes = thunkedAjax(character.imdbUrl + '/quotes');
        getQuotes((error, quotes) => {
          if (error) {
            onError(error);
          } else {
            Object.assign(character, {quotes});
            console.log(character);
          }
        });
      } else {
        console.log(character);
      }
    }
  }

  const getImdbProfile = thunkedAjax(character.imdbUrl);

  getImdbProfile((error, profile) => {
    if (error) {
      onError(error);
    }
    profileFetched = true;
    Object.assign(character, profile);
    getQuotesIfDone();
  });

  const getImdbFilms = thunkedAjax(character.imdbUrl + '/films');

  getImdbFilms((error, films) => {
    if (error) {
      onError(error);
    }
    filmsFetched = true;
    Object.assign(character, {films});
    getQuotesIfDone();
  });

}, onError)
