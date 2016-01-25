import fakeAjax from './fakeAjax';

export default function nodeAjax(url, callback) {
  return fakeAjax(url,
    (character) => callback(null, character),
    (error) => callback(error)
  );
}
