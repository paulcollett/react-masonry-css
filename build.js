var fs = require('fs');
var rollup = require('rollup');
var babel = require('@rollup/plugin-babel').default
var resolve = require('@rollup/plugin-node-resolve').default
var commonjs = require('@rollup/plugin-commonjs')
var replace = require('@rollup/plugin-replace')


const build = rollup.rollup({
  input: './src/react-masonry-css.js',
  external: ['react'],
  plugins: [babel({
    babelHelpers: 'inline',
    plugins: [
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-transform-object-assign",
      "@babel/plugin-proposal-object-rest-spread"
    ]
  })]
})

const files = build
  .then(bundle => Promise.all([
    bundle.generate({
      format: 'es',
    })
      .then((result) => result.output[0].code)
      .then((code) => write('./dist/react-masonry-css.module.js', code)),
    bundle.generate({
      format: 'cjs',
      exports: 'auto'
    })
      .then((result) => result.output[0].code)
      .then((code) => write('./dist/react-masonry-css.cjs.js', code)),
    bundle.generate({
      format: 'umd',
      globals: { react: 'react' },
      name: 'Masonry' // window.Masonry
    })
      .then((result) => result.output[0].code)
      .then((code) => write('./dist/react-masonry-css.umd.js', code))
  ]))
  .catch(logError)


// Demo
files.then(() => rollup.rollup({
  input: './demo/demo.js',
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': '"production"'
    }),
    babel({
      babelHelpers: 'bundled',
      plugins: ["@babel/plugin-transform-react-jsx"]
    }),
    // needed to import react/other node_modules
    commonjs(),
    resolve(),
  ]
}))
.then(bundle =>
  bundle.generate({
    format: 'iife',
    //name: 'Masonry',
  })
    .then((result) => result.output[0].code)
    .then((code) => write('./demo/demo.built.js', code))
)
.catch(logError)


function write(dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve()
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
