import fakeAjax from '../fakeAjaxAsPromise';

fakeAjax('geeks.com/cartman')

  .then((character) => {
    return Promise.all([
      fakeAjax(character.imdbUrl),
      fakeAjax(character.imdbUrl + '/films')
    ]).then((result) => {
      return Object.assign(character, result[0], {films: result[1]});
    });
  })

  .then((character) => {
    if (character.quotesCount === 0) {
      return character;
    }
    return fakeAjax(character.imdbUrl + '/quotes')
      .then((quotes) => Object.assign(character, {quotes}));
  })

  .then(
    (character) => console.log(character),
    (error) => console.log('Error: %s', error)
  );
