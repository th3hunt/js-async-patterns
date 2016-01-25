import nodeAjax from '../nodeAjax';
import Rx from 'rx';

const fetch = Rx.Observable.fromNodeCallback(nodeAjax);

Rx.Observable
  .just('geeks.com/cartman')
  .flatMapLatest(url => fetch(url))
  .flatMapLatest(
    (character) => {
      return Rx.Observable.combineLatest(
        fetch(character.imdbUrl),
        fetch(character.imdbUrl + '/films')
      ).map((results) => { // results == [imdb_profile, films]
        return Object.assign(character, results[0], {films: results[1]});
      });
    }
  )
  .flatMapLatest(
    (character) => {
      if (character.quotesCount > 0) {
        return fetch(character.imdbUrl + '/quotes')
          // .onErrorResumeNext(Rx.Observable.just('quotes not available'))
          .map(quotes => Object.assign(character, {quotes}));
      }
      return Rx.Observable.just(character);
    }
  )
  // .timeout(2000)
  .subscribe(
    (character) => console.log(character),
    (error) => console.log('Error: %s', error)
  );
