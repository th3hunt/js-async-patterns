const fakeResponses = {
  'foo.com': 'Foo Pony',
  'bar.com': 'Bar Pony',
  'qux.org': 'The last Pony'
};

export default function fakeAjax(url, success, error) {
  console.log(`Requesting: ${url}`);

  const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  const response = fakeResponses[url];

  if (response) {
    setTimeout(() => success(response), randomDelay);
  } else {
    setTimeout(() => error(404, `${url} not found`), randomDelay);
  }
}
