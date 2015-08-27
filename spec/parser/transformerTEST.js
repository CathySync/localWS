
    var fs = require('fs');
    var path = require('path');
    var ParserFactory = require("parser-factory");
    var FParser = new ParserFactory();

    var testDir = "C:\\Users\\ajon0002\\Documents\\NetBeansProjects\\localWS\\uploads\\testData";
    var files = fs.readdirSync(testDir);
    console.log(files)
    var filePath, fstream;
    
    for(var i in files){
        filePath = path.join(testDir, files[i]);
        console.log(filePath);
        
        var parser = FParser.getParser(filePath);
        var output = parser.parse();
        output.pipe(process.stdout);
    }