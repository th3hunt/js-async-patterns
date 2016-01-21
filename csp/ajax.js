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

csp.go(function* () {
  const data = yield csp.take(requestUrl('foo.com'));
  console.log(data);
});
