var express = require('express');
var router = express.Router();

/* GET images array. */
router.get('/', function(req, res) {
    var conn = req.conn;
    conn.query('SELECT * FROM `images`', function(err, results, fields){
        if(err) throw err;
        res.json(results);
    });
});
module.exports = router;