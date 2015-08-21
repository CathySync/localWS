var Transform = require('stream').Transform;
var fs = require('fs');
var path = require('path');

var transformer = new Transform();
transformer._transform = function(data, encoding, done) {
    this.push(data);
    done();
};

var testDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\testData";
var files = walk(testDir);

var filePath, fstream;
var globalContents = [];
var contents = [];

for(i=0; i<files.length;i++) {
    
    filePath = path.join(testDir, files[i]);

    fstream = fs.createReadStream(filePath);
    fstream.setEncoding("utf8");
    
    //happens AFTER loop exits. Get the transformer to do it??
    fstream.on('data', function(data){
        console.log(data);
        contents.push(data);
    });
    globalContents.push(contents);
    contents = [];
    fstream = null;
}

console.log(globalContents);

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