let path = require('path');

module.exports = {
watch: true,
  entry: {
    'home': path.resolve(__dirname + '/src/js/home.ts'),
    'signin': path.resolve(__dirname + '/src/js/auth.ts'),
    'register': path.resolve(__dirname + '/src/js/register.ts')
  },
  module:{
      rules: [
          {
              test: /\.tsx?$/,
              use:'ts-loader',
              exclude: /node_modules/
          }
      ]
  },
  output: {
    path: path.resolve(__dirname + '/public/js'),
    filename: 'bundle-[name].js'
  },
  resolve: {
    extensions: ['ts', 'js', 'tsx']
  },
  externals: {
    application: "application"
  }
}
