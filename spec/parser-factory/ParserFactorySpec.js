describe("parser-factory",function(){
    var ParserFactory = require("parser-factory");
    var FParser = new ParserFactory();
    
    var dataDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\testData";
    var testFiles = walk(dataDir);
    
    beforeEach(function(){
        var fileExtension, testFileLocation, parserInstance;
     });
 
    it("can create a default parser", function(){
        testFileLocation = dataDir + "\\abc.txt";
        parserInstance = FParser.getParser(testFileLocation); 

        expect(parserInstance).toBeDefined();
        expect(parserInstance.delimiter).toBe("\n");
        expect(parserInstance.location).toBe(testFileLocation);
    });
    

    it("gets parser type according to file type", function(){

        for(var f in testFiles){
            fileExtension = FParser.getFileType(f);//getFileExtension(f);
            testFileLocation = dataDir + "\\" + f;
            parserInstance = FParser.getParser(testFileLocation);
            expect(parserInstance).toBeDefined();
            
            switch(parserInstance.type){
                case "csv":{
                        expect(parserInstance.delimiter).toBe(",");
                        expect(parserInstance.comment).toBe("//");
                        break;
                }
                case "strings":{
                        expect(parserInstance.delimiter).toBe("=");
                        expect(parserInstance.comment).toBe(/\/*/);
                        break;
                }
                case "properties":{
                        expect(parserInstance.delimiter).toBe("=");
                        expect(parserInstance.comment).toBe(/#/);
                        break;
                }
                default:{
                        expect(parserInstance.delimiter).toBe("\n");
                        expect(parserInstance.comment).toBe("//");
                }
            }
            expect(parserInstance.location).toBe(testFileLocation);
        }

    });
});
/**
 * 
 * @param {type} dir
 * @param {type} files_
 * @returns {nm$_walk.exports.files_}
 */
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
