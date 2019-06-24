let BuildHivSummary = require('./build-hiv-summary');
let ScheduleHivSummary = require('./schedule-hiv-summary');
let Moment = require('moment');
try {
    let buildJob = new BuildHivSummary();
    let scheduleJob = new ScheduleHivSummary();
    let startedAt = Moment();
    console.log('Starting at:', startedAt.toLocaleString())

    scheduleJob.runJob().then(() => {
    buildJob.runJob().then(() => {
        console.log('Finshed all jobs.');
        let endedAt = Moment();
        let diff = endedAt.diff(startedAt, 'seconds');
        console.log('Took ' + diff + ' seconds.');
        process.exit(0)
    }).catch((err) => { 
        console.error('error running hiv summary job');
        throw err; 
        process.exit(1)
    })}).catch((err) => {
        console.error('error scheduling hiv summary');
        throw err;
        process.exit(1);
    });
} catch (error) {
    console.error('Error running pipeline', error);
    process.exit(1);
}
