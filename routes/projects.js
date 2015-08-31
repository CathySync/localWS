var express = require('express');
var router = express.Router();

/* GET projects array. */
router.get('/', function(req, res) {
    var conn = req.conn;
    var projects = [];
    var projquery = conn.query('SELECT * FROM `project`', function(err, results, fields){
        if(err) throw err;
        projects = results;
        res.json({"projects": projects});
        });
});
/*
function getProjectTasks(proj){
    var projId = proj.proj_projectid;
    var tasks = [];
    //Get the tasks.
    var taskquery = conn.query('SELECT * from `task` WHERE task_projectid = '+ projId, function(err, results, fields){
                    if(err) throw err;
                    tasks = results;
                    });
    taskquery.on('end', function(){
        console.log(tasks);
    })
    //tasks = tasks.map(getTaskTranslations(task));
//return tasks;
}

function getTaskTranslations(task){
    var taskId = task.task_taskid;
    //Get the translations to each task
    var translations = conn.query('SELECT * from `translation` WHERE tran_taskid = '+ taskId, function(err, results, fields){
            if(err) throw err;
    return results;
    });
    console.log(translations); 
    task["translations"] = translations;
return task;
}
*/
module.exports = router;