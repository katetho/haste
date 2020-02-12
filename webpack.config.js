let path = require('path');
console.log(__dirname + "/src/js/main.js")
module.exports = {
watch: true,
  entry: path.resolve(__dirname + "/src/js/main.js"),
  output: {
    path: path.resolve(__dirname + "/public/js"),
    filename: "bundle.js"
  },
}
