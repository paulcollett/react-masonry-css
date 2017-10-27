var fs = require('fs');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

rollup.rollup({
  input: './src/react-masonry-css.js',
  plugins: [babel({
    presets: ['react'],
    "plugins": ["transform-object-assign", "transform-object-rest-spread"]
  })]
})
.then(bundle =>
  bundle.generate({
    format: 'es',
  }).then(({code}) => write('./dist/react-masonry-css.es.js', code, bundle))
)
.then(bundle =>
  bundle.generate({
    format: 'cjs',
  }).then(({code}) => write('./dist/react-masonry-css.cjs.js', code, bundle))
)
.then(bundle =>
  bundle.generate({
    format: 'umd',
    name: 'ReactMasonryCss'
  }).then(({code}) => write('./dist/react-masonry-css.browser.js', code, bundle))
)
.catch(logError);


function write(dest, code, bundle) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve(bundle);
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
