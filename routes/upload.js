var express = require('express');
var router = express.Router();
var fse = require('fs-extra');
var parse = require('csv-parse');
var transform = require('stream-transform');

var ParserFactory = require('parser-factory');

router.post('/', function(req, res, next) {
    console.log("POST CALL");
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding) {
            
            console.log("Uploading: " + filename);
            //Path where image will be uploaded
            var fileExtension = getFileExtension(filename);
            var uploadtype = getUploadType(fileExtension);
            var relLocation = './uploads/' + uploadtype + "/" + filename;
            
            var FParser = new ParserFactory()
            var parser = FParser.getParser(relLocation);
            var output = parser.parse();
            console.log(output);
            /*
            fstream = fse.createWriteStream(relLocation);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);
                var responseData = "";
                if(fileExtension.toLowerCase() === "csv"){
                    parseCSV(relLocation);
                    //console.log(csvData);
                    //res.write(responseData);
                }
                //res.writeHead(200, { 'Connection': 'close' });
                res.end(responseData);
           
            res.end(output);
            });
            */
           res.end(output);
        });


});

router.options('/', function(req, res) {
    res.sendStatus(200);
});

router.get('/', function(req, res) {
    console.log("GET CALL");
    res.send("upload service alive")
});
/**
 * @description Parses a comma delimited csv file, returning an array of line arrays. 
 * @param {String} floc
 * @returns {undefined}
 */
function parseCSV(floc){
    
    var output = [];
    var parser = parse({delimiter: ',', skip_empty_lines:true});
    var uploadedInput = fse.createReadStream(floc);
        uploadedInput.setEncoding("utf8");
        
    var transformer = transform(function(record){
        output.push(record);
    });
    uploadedInput.pipe(parser).pipe(transformer);
return output;
}
/**
 * Get the extension of the file being uploaded. Use for parser factory and destination folder
 * @param {String} fn A filename
 * @returns {getFileExtension.ext} The file extension
 */
function getFileExtension(fn){
    if(!fn) throw new Error("getFileExtension: no file name");
    var ext = fn.split(".")[1];
    return ext;
}
/**
 * Given a file extension return whether the file is to be placed in /data, /images
 * @param {String} fileExtension
 * @returns {String|getUploadType.uploadType|undefined}
 */
function getUploadType(fileExtension){
if(!fileExtension) return;

    var uploadType = "";
    switch(fileExtension){
        case "jpg":
        case "png":
            uploadType = "images";
            break;
        case "csv":
        case "xls":
        case "xlsx":
        case "strings":
        case "properties":
        case "xml":
            uploadType = "data";
            break;
        default: uploadType =  "";
    }
    return uploadType
}

module.exports = router;
