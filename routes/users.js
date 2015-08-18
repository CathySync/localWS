var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
    var conn = req.conn;
    var collection = conn.query('SELECT * FROM `user`', function(err, results, fields){
        //if(err) throw err;
        return results;
    });
    console.log(collection);
    //res.json(collection);
    //collection.find({},{},function(e,docs){
    //    res.json(docs);
    //});
});

//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

module.exports = router;
