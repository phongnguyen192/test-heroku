'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _lowdb = require('lowdb');

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileAsync = require('lowdb/adapters/FileAsync');

var _FileAsync2 = _interopRequireDefault(_FileAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var adapter = new _FileAsync2.default('logs-db.json', {
    defaultValue: { logs: [] }
});
(0, _lowdb2.default)(adapter).then(function (db) {
    //ROUTER POST:
    router.post('/', function (req, res) {
        var data = req.body;
        // Add a logs
        var id = (0, _uniqid2.default)();
        db.get('logs').push({ _id: id, email: data.email, fid: data.fid, was_viewed: false, reminders_sent: 0, created_at: new Date().toISOString(), updated_at: null }).write().then(function (p) {
            res.send(id);
        });
        // return res.send("Success");
    });

    //ROUTER: GET
    router.get('/', function (req, res, next) {
        var key = req.query.s ? req.query.s : '';
        var url = req.query.redirect ? req.query.redirect : '';

        var result = db.get('logs').find({ _id: key }).value();

        if (result && url) {
            db.get('logs').find({ _id: key }).assign({ was_viewed: true, updated_at: new Date().toISOString() }).write().then(function (r) {
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
});

exports.default = router;