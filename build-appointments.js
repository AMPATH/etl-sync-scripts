
let QueryRunner = require('./query-runner');

let queryRunner = new QueryRunner().getInstance();

class BuildAppointment {

    constructor() {

    }

    runJob() {
        return new Promise((resolve, reject) => {
            let sql = `select count(*) as items_in_queue from etl.flat_appointment_build_queue`;

            queryRunner.runQuery(sql)
                .then((result) => {
                    let items = result.results[0].items_in_queue;
                    console.log('Items in queue:' + items);

                    let batches = items < 20 ? 1 : items / 20;
                    batches = Math.ceil(batches);
                    console.log('batches: ' + batches);

                    let queries = [];

                    for(let i =0; i < batches; i++) {
                        let qry = `call generate_flat_appointment_v1_1("sync",${i},20,20);`;
                        queries.push(queryRunner.runQuery(qry));
                    }

                    Promise.all(queries).then((results)=>{
                        console.log('finished running all the queries', results);
                        resolve(results);
                    }).catch((err)=>{
                        reject(err);
                        console.error('Error running all the queries', err);
                    });

                    //resolve(parallelism)
                })
                .catch((err) => {
                    // handle error
                    reject(err);
                });

        });
    }

}

module.exports = BuildAppointment;
