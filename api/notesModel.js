const path = require('path');
const nedb = require('nedb');

const dataStore = path.resolve(__dirname, "data", "dataStore");

const db = new nedb({
    filename: dataStore,
    autoload: true,
    timestampData: true
});

const findAll = function (query, callback) {
    let orderby = "createdAt";

    if (query.orderby) {
        orderby = query.orderby;
    }

    let direction = 1;
    if (query.direction) {
        if (query.direction === "ASC") {
            direction = 1;
        } else {
            direction = -1;
        }
    }

    let filterPattern = {};

    if (query.filterbyfinished === "true") {
        filterPattern = {
            finishedAt: {
                $gt: ""
            }
        };
    }

    const sortpattern = {
        [orderby]: direction
    };

    db.find(filterPattern).sort(sortpattern).exec(function (err, docs) {
        callback(docs, 200);
    });
}

const find = function (id, callback) {
    db.findOne({
        _id: id
    }, function (err, doc) {
        callback(doc, 200);
    });
}

const save = function (note, callback) {
    db.insert(note, function (err, doc) {
        callback(doc, 200);
    });
}

const update = function (id, note, callback) {
    db.update({
        _id: id
    }, note, {
        returnUpdatedDocs: true
    }, function (err, numAffected, docs, upsert) {
        callback(docs, 200);
    });
}

module.exports = {
    findAll,
    find,
    save,
    update
}