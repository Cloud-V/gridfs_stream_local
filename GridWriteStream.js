const db = require("./Database")
const EventEmitter = require("events");
const fs = require("fs");

class GridWriteStream extends EventEmitter {
  constructor(options = {}) {
    super(options);
    this.filename = options.filename || "untitled.txt";
  }

  run() {
    let self = this;

    db.createFile({filename: this.filename, contentType: "text", length: 0}).then((file)=>{
      fs.writeFile(this.filename, "text", err => {
        if (err) {
          //TODO: Remove file from database
          self.emit("error",err);
          return;
        }
        self.emit("close",file);
        
      });
    }).catch(err=>{
      self.emit("error",err)
    });
  }
}

module.exports = exports = GridWriteStream;
