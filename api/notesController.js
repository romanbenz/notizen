const notesModel = require('./notesModel');

const index = function (request, response) {
    const sendJson = function (docs, status) {
        response.status(status).json(docs);
    }
    notesModel.findAll(request.query, sendJson);
};

const show = function (request, response) {

    const sendJson = function (doc, status) {
        response.status(status).json(doc);
    }

    notesModel.find(request.params.id, sendJson);
};

const store = function (request, response) {
    const note = {
        title: request.body.title || "Missing title",
        description: request.body.description,
        importance: request.body.importance || 1,
        dueBy: request.body.dueBy,
        finishedAt: request.body.finishedAt
    }

    const sendJson = function (doc, status) {
        response.status(status).json(doc);
    }

    notesModel.save(note, sendJson);
};

const update = function (request, response) {
    const note = request.body;

    const sendJson = function (doc, status) {
        response.status(status).json(doc);
    }
    notesModel.update(request.params.id, {
        $set: note
    }, sendJson);
};

module.exports = {
    index,
    show,
    store,
    update
};