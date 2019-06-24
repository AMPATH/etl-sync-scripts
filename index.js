let HivSummaryJob = require('./hiv-summary/hiv-summary');
let ScheduleHivSummary = require('./hiv-summary/schedule-hiv-summary');
let AppointmentsJob = require('./appointments/appointments');
let ScheduleAppointments = require('./appointments/schedule-appointments');
let Moment = require('moment');
try {
    let jobType = process.argv[2];
    let dataset = process.argv[3];
    let buildJob;
    let scheduleJob;

    switch (dataset) {
        case 'flat_hiv_summary':
            buildJob = new HivSummaryJob(jobType);
            scheduleJob = new ScheduleHivSummary(jobType);
            break;
        case 'flat_appointment':
            buildJob = new AppointmentsJob(jobType);
            scheduleJob = new ScheduleAppointments(jobType);
            break;
        default:
            throw new Error("Please specify dataset");
    }

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
        })
    }).catch((err) => {
        console.error('error scheduling hiv summary');
        throw err;
        process.exit(1);
    });
} catch (error) {
    console.error('Error running pipeline', error);
    process.exit(1);
}