var express = require('express');
var router = express.Router();

/* GET images array. */
router.get('/', function(req, res) {
    var results  = walk("./uploads/images");
    //var conn = req.conn;
    //conn.query('SELECT * FROM `images`', function(err, results, fields){
    //    if(err) throw err;
        res.json(results);
    //});
});
module.exports = router;

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