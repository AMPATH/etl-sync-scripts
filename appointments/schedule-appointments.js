let QueryRunner = require('../query-runner');

let queryRunner = new QueryRunner().getInstance();

class ScheduleAppointments {

    constructor() {
        if (jobType === jobs.SYNC_JOB) {
            this.queue_table = "etl.flat_appointment_build_queue"
        } else {
            this.queue_table = "etl.flat_appointment_sync_queue";
        }
    }

    runJob() {
        return new Promise((resolve, reject) => {
            let sql = `CALL schedule_appointments(${this.queue_table})`;

            queryRunner.runQuery(sql)
                .then((result) => {
                    if (result.results) {
                        console.log('scheduled: ' + JSON.stringify(result.results));
                    } else {
                        console.log('Error scheduling hiv summary');
                    }
                    resolve(result);
                })
                .catch((err) => {
                    // handle error
                    reject(err);
                });

        });
    }

}

module.exports = ScheduleHivSummary;