import fakeAjax from '../fakeAjax.js';
import csp from 'js-csp';

function requestUrl(url) {
  const ch = csp.chan();
  fakeAjax(url,
    response => csp.putAsync(ch, response),
    response => csp.putAsync(ch, new Error(response))
  );
  return ch;
}

function* ancestry(url) {
  let character;
  do {
    character = yield csp.take(requestUrl(url));

    if (character instanceof Error) { // wouldn't it be nice if csp.take would throw it?
      console.log('Error: %s', character.message);
      console.log('Falling back to %s', 'lotr.com/arvedui');
      url = 'lotr.com/arvedui';
    } else {
      console.log('> %s\n', character.title);
      url = character.ancestor;
    }
  } while(character !== csp.CLOSED && url);
}

csp.spawn(ancestry('lotr.com/aragorn'));
