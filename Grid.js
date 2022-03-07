const GridWriteStream = require("./GridWriteStream");
const GridReadStream = require("./GridReadStream");

function Grid() { }

Grid.prototype.createWriteStream = function (options) {
  return new GridWriteStream(options);
};

Grid.prototype.createReadStream = function (options) {
  return new GridReadStream(options);
}
Grid.prototype.remove = function (options, callback) {
  console.log("Remove Options in Grid.js: ", options)
  return;
}
module.exports = exports = Grid;