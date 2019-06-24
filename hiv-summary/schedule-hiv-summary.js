let QueryRunner = require('../query-runner');
let jobs = require('../constants');
let queryRunner = new QueryRunner().getInstance();

class ScheduleHivSummary {
    constructor(jobType) {
        if (jobType === jobs.SYNC_JOB) {
            this.queue_table = "etl.flat_hiv_summary_sync_queue"
        } else {
            this.queue_table = "etl.flat_hiv_summary_build_queue";
        }
    }

    runJob() {
        return new Promise((resolve, reject) => {
            let sql = `CALL schedule_hiv_summary(${queue_table})`;
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