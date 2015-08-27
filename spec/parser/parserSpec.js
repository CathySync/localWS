describe("parser", function(){
    var fs = require('fs');
    var path = require('path');
    var ParserFactory = require("parser-factory");
    var FParser = new ParserFactory();

    var testDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\testData";
    var files = listDirectory(testDir);
    var filePath, fstream;
    for(var file in files){
        filePath = path.join(testDir, file);
        console.log(filePath);
        
        var parser = FParser.getParser(filePath);
        var output = parser.parse();
        output.pipe(process.stdout);
        //fstream = fs.createReadStream(filePath);
        //fstream.pipe(transformer);
        //fstream.read()
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

