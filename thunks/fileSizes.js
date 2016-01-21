const thunk = require('thunks')()
const fs = require('fs')

const size = thunk.thunkify(fs.stat);

// sequential
size('files/foo.txt')(function (error, res) {
  console.log('foo.txt', res.size);
  return size('files/bar.txt')

})(function (error, res) {
  console.log('bar.txt', res.size);
  return size('files/qux.txt')

})(function (error, res) {
  console.log('qux.txt', res.size);
  return 'The End';

})(function (error, res) {
  console.log(res);

})(function (error, res) {
  console.log(res);
});

// parallel
thunk.all([
  size('files/foo.txt'),
  size('files/bar.txt'),
  size('files/qux.txt')
])(function (error, res) {
  console.log('foo.txt %s | bar.txt %s | bar.txt %s', ...res.map(fileStats => fileStats.size));
})
