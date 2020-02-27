let path = require('path');

module.exports = {
watch: true,
  entry: {
    'home': path.resolve(__dirname + '/src/js/home.js'),
    'signin': path.resolve(__dirname + '/src/js/auth.js'),
    'register': path.resolve(__dirname + '/src/js/register.js')
  },
  output: {
    path: path.resolve(__dirname + '/public/js'),
    filename: 'bundle-[name].js'
  },
}
