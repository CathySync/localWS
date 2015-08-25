var fs = require('fs');
var path = require('path');
var csv = require("csv");

var testDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\testData\\csv";
//var testDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\TranslationPortal2\\src\\testInputFiles\\csv\\";
var files = walk(testDir);

var filePath, fstream;

for(i=0; i<files.length;i++) {

    filePath = path.join(testDir, files[i]);
    fstream = fs.createReadStream(filePath);
    fstream.setEncoding("utf8");
    var lines = [];
    
    fstream.pipe(csv.parse({delimiter:",", comment:"/*", relax:true})) //Array per line
        .pipe(csv.transform(function(record){ //callback per line
                var line = []; 
                record.map(function(value){ //callback per col
                        line.push({"capv_string":value});
                    });
                return line;
        }))
        .pipe(csv.stringify())
        .pipe(process.stdout);
}

function toUpper(line){
    return line.toString().toUpperCase();
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