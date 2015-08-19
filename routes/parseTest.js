var express = require('express');
var router = express.Router();
var ParserFactory = require("parser-factory");

router.get("/", function(req, res, next){
    var testFileLocation = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\data\\demo-data.csv";
    var testFileExtension = "csv";
    var testParser = new ParserFactory(testFileExtension).getParser({location:testFileLocation});
    
    res.send(testParser.parse());
});

module.exports = router;


