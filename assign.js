const asanaRequire = require('asana');

const PERSONAL_ACCESS_TOKEN = ""; // TODO : FILL

// Create Asana client using deprecation headers and PAT.
const asana = asanaRequire.Client.create({}).useAccessToken(PERSONAL_ACCESS_TOKEN);

const ASANA_WORKSPACE_ID = ""; // TODO : FILL
const API_PLAYGROUND_PROJECT_ID = ""; // TODO : FILL
const ASSIGNEE_ID = ""; // TODO : FILL
const UNASSIGNED_ID = "null";

// Delay between requests in ms
const DELAY = 200;

let assignUnassignedTasks = function() {
    getTasksFromPlaygroundByAssignee(UNASSIGNED_ID).then(collection => {
        let unassignedTasks = collection.data;
        assignTasksTo(unassignedTasks, ASSIGNEE_ID);
    });
};

function getTasksFromPlaygroundByAssignee(assignee) {
    let params = {
        "projects.any" : API_PLAYGROUND_PROJECT_ID,
        "assignee.any" : assignee,
        "resource_subtype": "default_task",
        "fields": "gid",
        "limit": 100
    };
    return asana.tasks.searchInWorkspace(ASANA_WORKSPACE_ID, params);
}

function assignTasksTo(unassignedTasks, assigneeId) {
    if (unassignedTasks.length > 0) {
        let index = 0;

        // Interval to control frequency of requests
        let interval = setInterval(function() {

            assignTask(unassignedTasks[index].gid, assigneeId);

            index++;
            if (index >= unassignedTasks.length) {
                clearInterval(interval);
                console.log("Assigned " + unassignedTasks.length + " tasks");
            }
        }, DELAY);

    } else {
        console.log("No tasks to reassign");
    }
}

function assignTask(taskId, assigneeId) {
    return asana.tasks.update(taskId, {assignee: assigneeId});
}

assignUnassignedTasks();
