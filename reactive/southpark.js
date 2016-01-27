import nodeAjax from '../nodeAjax';
import Rx from 'rx';

const fetch = Rx.Observable.fromNodeCallback(nodeAjax);

function fetchCharacter(url) {
  return Rx.Observable
    .just(url)
    .flatMapLatest(url => fetch(url))
    .flatMapLatest(
      (character) => {
        return Rx.Observable.combineLatest(
          fetch(character.spdbUrl + '/friends'),
          fetch(character.spdbUrl + '/record')
        ).map(([friends, criminalRec]) => {
          return Object.assign(character, {friends, criminalRec});
        });
      }
    )
    .flatMapLatest(
      (character) => {
        if (character.friends < 2 && character.criminalRec) {
          console.log('Friends: %s. CR: %s  => infamous!\n', character.friends, character.criminalRec);
          return fetch(character.spdbUrl + '/known_for')
            // .onErrorResumeNext(Rx.Observable.just('quotes not available'))
            .map(knownFor => Object.assign(character, {knownFor}));
        }
        return Rx.Observable.just(character);
      }
    )
    // .timeout(2000)
}

fetchCharacter('imdb.com/cartman').subscribe(
  (eric) => console.log(eric),
  (error) => console.error('Error: %s', error)
);
