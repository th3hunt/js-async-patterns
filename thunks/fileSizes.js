const thunk = require('thunks')()
const fs = require('fs')

const size = thunk.thunkify(fs.stat);

// sequential
size('thunks/files/foo.txt')(function (error, res) {
  console.log('foo.txt', res.size);
  return size('thunks/files/bar.txt')

})(function (error, res) {
  console.log('bar.txt', res.size);
  return size('thunks/files/qux.txt')

})(function (error, res) {
  console.log('qux.txt', res.size);
  return 'The End';

})(function (error, res) {
  console.log(res);

})(function (error, res) {
  console.log(res);
});

// sequential 2
thunk.seq([
  size('thunks/files/foo.txt'),
  size('thunks/files/bar.txt'),
  size('thunks/files/qux.txt')
])(function (error, res) {
  console.log('foo.txt %s | bar.txt %s | bar.txt %s', ...res.map(fileStats => fileStats.size));
})

// parallel
thunk.all([
  size('thunks/files/foo.txt'),
  size('thunks/files/bar.txt'),
  size('thunks/files/qux.txt')
])(function (error, res) {
  console.log('foo.txt %s | bar.txt %s | bar.txt %s', ...res.map(fileStats => fileStats.size));
})
