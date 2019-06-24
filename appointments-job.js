let SyncAppointments = require('./sync-appointments');
let ScheduleAppointments = require('./schedule-appointments');
let Moment = require('moment');
try {
    let buildJob = new SyncAppointments();
    let scheduleJob = new ScheduleAppointments();

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
        console.error('error running appointments job');
        throw err; 
        process.exit(1)
    })}).catch((err) => {
        console.error('error scheduling appointments');
        throw err;
        process.exit(1);
    })
} catch (error) {
    console.error('Error running pipeline', error);
}
