var express = require('express');
var router = express.Router();
/* GET users array. */
router.get('/', function(req, res) {
    var conn = req.conn;
    conn.query('SELECT * FROM `user`', function(err, results, fields){
        if(err) throw err;
        res.json(results);
    });
});

/*POST login credentials*/
/**************** YOU ARE PUTTING THE USER RECORD ON CLIENT, PASSWORD AND ALL *****************/
router.post('/', function(req, res) {
    var conn = req.conn;
    var usLoginInput = req.body.data;

    conn.query("SELECT * FROM `user` WHERE user_logon=?",[usLoginInput.lg], function(err, results, fields){
        if(err) throw err;
        var recUser = results[0];
        if(recUser){
            var authenticated = recUser.user_password == usLoginInput.pw;
            if(authenticated){
                res.json(results);
            }
        }
        //fall through
        console.log("not authenticated");
        res.end(false);
            
    });
});

module.exports = router;
