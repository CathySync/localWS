var express = require('express');
var router = express.Router();

/* GET images array. */
router.get('/', function(req, res) {
    var results  = walk("./uploads/images");
        res.json(results);
    //});
});
module.exports = router;

/**
 * @description Given a parameter dir path, 
 * return an array of all the filenames in that dir and subdirs. 
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