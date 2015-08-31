var express = require('express');
var router = express.Router();

/* GET tasks array. */
router.get('/', function(req, res) {
    var conn = req.conn;
    var tasks = [];
    var projquery = conn.query('SELECT * FROM `task`', function(err, results, fields){
        if(err) throw err;
        tasks = results;
        res.json({"tasks": tasks});
        });
});

module.exports = router;