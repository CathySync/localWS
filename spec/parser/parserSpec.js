describe("parser", function(){
    var Transform = require('stream').Transform;
    var fs = require('fs');
    var path = require('path');
    var transformer = new Transform();
        transformer._transform = function(data, encoding, done) {
            this.push(data);
            console.log(data);
        done();
    };
    var testDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\testData";
    var files = listDirectory(testDir);
    var filePath, fstream;
    for(var file in files){
        filePath = path.join(testDir, file);
        fstream = fs.createReadStream(filePath);
        fstream.pipe(transformer);
        fstream.read()
    }

/**
 * @description calls callback on array of all files in a folder matching optional extension filter
 * @param {type} dir
 * @param {type} extension
 * @param {type} callback
 * @returns {undefined}
 */
function listDirectory(dir, extension, callback) {
    var fs = require("fs");
    fs.readdir(dir, function(err, list) {
        if (err) {
            return callback(err);
        }

        var suffix = '.' + extension;
        list = list.filter(function(file) {
            if (!extension) {
                return true;
            }
            return file.indexOf(suffix, file.length - suffix.length) !== -1;
        });

        callback(null, list);
    });
};
});

