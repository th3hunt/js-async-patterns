import fakeAjax from './fakeAjax';

export default function fakeAjaxAsPromise(url) {
  return new Promise(function (resolve, reject) {
    fakeAjax(url,
      (character) => resolve(character),
      (error) => reject(error)
    );
  });
}
