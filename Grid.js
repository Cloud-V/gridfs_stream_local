const GridWriteStream = require("./GridWriteStream");
const GridReadStream = require("./GridReadStream");

function Grid() {}

Grid.prototype.createWriteStream = function(options) {
  return new GridWriteStream(options);
};

Grid.prototype.createReadStream = function(options) {
  return new GridReadStream(options);
}
module.exports = exports = Grid;