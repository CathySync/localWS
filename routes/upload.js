var express = require('express');
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');

router.post('/', function(req, res, next) {
    console.log("POST CALL");
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream('./uploads/' + filename);
            //console.log(file)
            file.pipe(fstream);
            fstream.on('close', function () {    
                //console.log("Upload Finished of " + filename);              
                res.sendStatus(200);           //where to go next
            });
        });

});

//router.options('/', multipartyMiddleware, FileController.uploadFile);

router.options('/', function(req, res) {
    res.sendStatus(200);
});

router.get('/', function(req, res) {
    console.log("GET CALL");
    console.log(req);
    res.send("hello")
});
module.exports = router;
