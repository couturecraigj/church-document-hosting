const { src, dest, task, series, parallel, watch } = require('gulp');
const hashFiles = require('hash-files');
const webpackStream = require('webpack-stream');
const todo = require('gulp-todo');
const webpack = require('webpack');
const through = require('through2');

task('todos', () =>
  src([
    'src/service-worker/**/*.js',
    'src/client/**/*.js',
    'src/common/**/*.js',
    'src/server/**/*.js'
  ])
    .pipe(todo())
    .pipe(dest('./'))
);

task('build', () => {
  let hash = hashFiles.sync({
    files: ['./src/client/**', './src/common/**', './src/service-worker/**']
  });
  return src('src/service-worker/**')
    .pipe(
      through.obj((chunk, enc, callback) => {
        hash = hashFiles.sync({
          files: [
            './src/client/**',
            './src/common/**',
            './src/service-worker/**'
          ]
        });
        callback(null, chunk);
      })
    )
    .pipe(
      webpackStream({
        entry: {
          sw: './src/service-worker/index.js'
        },
        output: {
          filename: '[name].js'
        },
        target: 'webworker',
        plugins: [
          new webpack.DefinePlugin({
            'process.env.CACHE_HASH': JSON.stringify(hash)
          })
        ]
      })
    )
    .pipe(dest('public'));
});

task(
  'watch',
  series('build', () => {
    watch(
      ['./src/client/**', './src/common/**', './src/service-worker/**'],
      parallel('build', 'todos')
    );
  })
);

task('default', series('build'));
