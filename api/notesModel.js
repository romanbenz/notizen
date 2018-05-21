const path = require('path');
const nedb = require('nedb');

const dataStore = path.resolve(__dirname, "data", "dataStore");

const db = new nedb({ filename: dataStore, autoload: true , timestampData: true});

const findAll = function(callback) {
    db.find({}).sort({ createdAt: -1 }).exec(function (err, docs) {        
        callback(docs, 200);
    });
}

const find = function(id, callback) {
    db.findOne({_id: id}, function (err, doc) {
        callback(doc, 200);
    });
}

const save = function(note, callback) {
    db.insert(note, function (err, doc) {
        callback(doc, 200);
    });
}

const update = function(id, note, callback) {
    db.update({ _id: id }, note, {returnUpdatedDocs: true}, function (err, numAffected, docs, upsert) {
        callback(docs, 200);
    });
}

module.exports = {
    findAll,
    find,
    save,
    update
}
