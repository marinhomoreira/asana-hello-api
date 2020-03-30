const asanaRequire = require('asana');

const PERSONAL_ACCESS_TOKEN = ""; // TODO : FILL
const asana = asanaRequire.Client.create({}).useAccessToken(PERSONAL_ACCESS_TOKEN);

const PROJECT_ID = ""; // TODO : FILL

const createTasks = function(numberOfTasks) {
    let index = 1;

    // Interval to control frequency of requests
    let interval = setInterval(function() {

        const task = {
            "name": "New new task " + index,
            "projects": [
                PROJECT_ID
            ],
        };

        asana.tasks.create(task);

        index++;
        if (index > numberOfTasks) {
            clearInterval(interval);
            console.log("Creating " + numberOfTasks + " tasks");
        }
    }, 200);
};

createTasks(3);
