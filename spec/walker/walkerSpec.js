describe("walker", function(){
    it("is a function", function(){
        expect(walk).toBeDefined();
        expect(typeof walk).toBe("function");
    });
    describe("given a directory", function(){
        var testDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\testData";
        
        it("can find all the files in that folder and subfolders", function(){
            var testDirectories = walk(testDir);
            expect(testDirectories).toContain("TXT.txt")
            expect(testDirectories).toContain("CSV.csv");
            expect(testDirectories).toContain("PROPERTIES.properties");
            expect(testDirectories).toContain("STRINGS.strings");
            expect(testDirectories).not.toContain(undefined);
            expect(testDirectories).not.toContain(null);
        });
    });
       
});

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

/*
function getFolders(currentDirPath, callback) {
    var fs = require('fs'), path = require('path');
    return fs.readdirSync(currentDirPath).map(function(name) {

        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walk(filePath, callback);
        }
    });
} 
 */