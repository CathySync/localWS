var express;
express = require('express');
var router = express.Router();
var fs = require('fs');
var ParserFactory = require('parser-factory');

router.post('/', function(req, res, next) {
    console.log("POST CALL");
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding) {
            console.log("Uploading: " + filename);
            
            //Path where image will be uploaded
            var fileExtension = getFileExtension(filename);
            var uploadType = getUploadType(fileExtension);
            var relLocation = './uploads/' + uploadType + "/" + filename;
            fstream = fs.createWriteStream(relLocation);
            file.pipe(fstream);
            
            //The file has been uploaded to relLocation
            fstream.on('close', function () {
                if(uploadType === 'images'){
                    res.status(200).end();
                } else {
                    console.log("parsing: " + filename);
                    var parser = new ParserFactory().getParser(relLocation);
                    var output = parser.parse();
                    output.pipe(res, function(){console.log("output piped")});
                    console.log("output sent.");
                    //res.write(output);
                    //res.status(200).end();
                }
            });
        });
});

router.options('/', function(req, res) {
    res.sendStatus(200);
});

router.get('/', function(req, res) {
    console.log("GET CALL");
    res.send("upload service alive");
});

/* GET images array. */
router.get('/images/:img', function(req, res) {
    var path = req.path.split("/");
    var reqImage = path[path.length-1];
    
    var fileImage = fs.readFileSync('./uploads/images/'+reqImage);
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(fileImage, 'binary');
});
/**
 * @description Parses a comma delimited csv file, returning an array of line arrays. 
 * @param {String} floc
 * @returns {undefined}
 */
function parseCSV(floc){
    
    var output = [];
    var parser = parse({delimiter: ',', skip_empty_lines:true});
    var uploadedInput = fs.createReadStream(floc);
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
    fileExtension = fileExtension.toLowerCase();
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
    return uploadType;
}

function walk (dir, files_){
    var fs = require('fs');
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            walk(name, files_);
        } else {
            files_.push(files[i]);
        }
    }
    return files_;
}

module.exports = router;
