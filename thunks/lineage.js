import fakeAjax from '../fakeAjax.js';
import thunks from 'thunks';

const thunk = thunks();

// node style required
const fetchCharacter = thunk.thunkify(function (url, callback) {
  return fakeAjax(url,
    response => callback(null, response),
    response => callback(response)
  );
});

function showCharacter(error, character) {
  if (error) {
    console.log('Error: %s', error.message);
    console.log('Falling back to %s', 'lotr.com/arvedui');
    return fetchCharacter('lotr.com/arvedui');
  }

  console.log('> %s', character.title);

  if (character.ancestor) {
    return fetchCharacter(character.ancestor);
  }
}

fetchCharacter('lotr.com/aragorn')(
  showCharacter
)(
  showCharacter
)(
  showCharacter
)(
  showCharacter
)(
  showCharacter
);
