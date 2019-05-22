let BuildAppointments = require('./build-appointments');
let Moment = require('moment');
try {
    let buildJob = new BuildAppointments();
    let startedAt = Moment();
    console.log('Starting at:', startedAt.toLocaleString())
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
    });
} catch (error) {
    console.error('Error running pipeline', error);
}
