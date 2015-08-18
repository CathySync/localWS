var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fse = require('fs-extra');
var parse = require('csv-parse');
//var parser = require('stream').Transfer;
var async = require('async');


router.post('/', function(req, res, next) {
    console.log("POST CALL");
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            
            console.log("Uploading: " + filename);
            //Path where image will be uploaded
            var fileExtension = getFileExtension(filename);
            var uploadtype = getUploadType(fileExtension);
            var relLocation = './uploads/' + uploadtype + "/" + filename;
            
            fstream = fse.createWriteStream(relLocation);
            file.pipe(fstream);
            
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);
                
                if(fileExtension.toLowerCase() === "csv"){
                    parseCSV(relLocation);
                    //console.log(csvData);
                    //res.json(csvData);
                }
                res.sendStatus(200);
            });
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
 * @description Parses a csv file, returning an array of line arrays. 
 * @param {String} floc
 * @returns {undefined}
 */
function parseCSV(floc){
    
    var parser = parse({delimiter: ','}, function (err, data) {
        console.log(data)
        return data;
    });

    fse.createReadStream(floc).pipe(parser);
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
