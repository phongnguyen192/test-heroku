
import { Router } from 'express';
import uniqid from 'uniqid';
import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

const router = Router();
const adapter = new FileAsync('logs-db.json', {
    defaultValue: { logs: [] }
});
lowdb(adapter)
    .then(db => {
        //ROUTER POST:
        router.post('/', (req, res) => {
            const data = req.body;
            // Add a logs
            let id = uniqid();
            db.get('logs').push({ _id: id, email: data.email, fid: data.fid, was_viewed: false, reminders_sent: 0, created_at: new Date().toISOString(), updated_at: null })
                .write().then(p => {
                    res.send(id);
                });
            // return res.send("Success");
        });

        //ROUTER: GET
        router.get('/', (req, res, next) => {
            const key = (req.query.s) ? req.query.s : '';
            const url = (req.query.redirect) ? req.query.redirect : '';

            const result = db.get('logs').find({ _id: key }).value();

            if (result && url) {
                db.get('logs').find({ _id: key }).assign({ was_viewed: true, updated_at: new Date().toISOString() })
                    .write().then(r => {
                        //Redirect to Https
                        res.writeHead(302, {
                            'Location': url
                        });
                        res.end();
                    });
            } else {
                res.status(400).send("Item not found to update");
            };
        });
    })

export default router;