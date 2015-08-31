var express = require('express');
var router = express.Router();

/* GET projects array. */
router.get('/', function(req, res) {
    var conn = req.conn;
    var projects = [];
    var tasks = [];
    var translations = [];

    var projquery = conn.query('SELECT * FROM `project`', function(err, results, fields){
        if(err) throw err;
        projects = results;
        });
        //When the project query returns, nest each project with its tasks, and each tasks translations to output
        projquery.on('end', function(){

        var taskquery = conn.query('SELECT * from `task`', function(err, results, fields){
                if(err) throw err;
                tasks = results;
            });

        taskquery.on('end', function(){
            var translationsquery = conn.query('SELECT * from `translation`', function(err, results, fields){
                if(err) throw err;
                translations = results;
                //Give each task its translations, and each project its tasks.
                var nestedTaskTrans = tasks.map(function(el){
                    var taskid = el.task_taskid
                    var scopeTrans = translations.filter(function(tran){
                        if(tran.tran_taskid == taskid) return tran;
                    });
                    el["translations"] = scopeTrans;
                    return el;
                });

            var nestedprojectTasks = projects.map(function(proj){
                var projid = proj.proj_projectid;
                            //Give each project its tasks
                var nestedProjectTasks = nestedTaskTrans.filter(function(ntt){
                    if(ntt.task_taskid == projid) return ntt;
                            });
                    proj["tasks"] = nestedProjectTasks;
                            return proj;
                        });
                        //console.log(nestedprojectTasks);
                        res.json({"projects": nestedprojectTasks});
                    });
                });
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