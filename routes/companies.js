var express = require('express');
var router = express.Router();

/* GET companies array. */
router.get('/', function(req, res) {
    var conn = req.conn;
    conn.query('SELECT * FROM `company`', function(err, results, fields){
        if(err) throw err;
        res.json({"companies": results});
    });
});

module.exports = router;