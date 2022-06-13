const Database = require("./Database");
const GridWriteStream = require("./GridWriteStream");
const GridReadStream = require("./GridReadStream");
const fs = require("fs-extra");

class Grid {
    constructor(metadataConnection, gridfsFilesPath = "gridfs-files") {
        this.db = new Database(metadataConnection);
        this.createFolderIfNotExists(gridfsFilesPath)
        this.gridfsFilesPath = gridfsFilesPath;
    }
    createFolderIfNotExists(path) {
        var dir = path;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    createWriteStream(options) {
        return new GridWriteStream(this.db, this.gridfsFilesPath, options);
    }

    createReadStream(options) {
        return new GridReadStream(this.db, options);
    }

    async remove(options, cb) {
        try {
            if (!options._id) {
                return cb(null);
            }

            let file = await this.db.getFile(options._id);
            if (!file) {
                throw new Error("File not found.");
            }
            await fs.unlink(file.filename);
            return cb(null);
        } catch (err) {
            return cb(err);
        }
    }
}

module.exports = exports = Grid;
