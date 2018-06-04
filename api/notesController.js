const notesModel = require('./notesModel');

const index = function (request, response) {

    const sendJson = function (docs, status) {
        response.status(status).json(docs);
    }

    notesModel.findAll(sendJson);
};

const show = function (request, response) {

    const sendJson = function (doc, status) {
        response.status(status).json(doc);
    }

    notesModel.find(request.params.id, sendJson);
};

// curl -d "title=Hallo&priority=2" -X POST http://localhost:3000/api/notes
const store = function (request, response) {
    const note = {
        title: request.body.title || "Missing title",
        description: request.body.description,
        importance: request.body.importance || 1,
        dueBy: request.body.dueBy,
        finishedAt: request.body.finishedAt
    }

    const sendJson = function (doc, status) {
        console.log(doc);
        response.status(status).json(doc);
    }

    console.log("PARAM: " + request.body._id);
    if (request.body._id) {
        notesModel.update(request.body._id, note, sendJson);
    } else {
        notesModel.save(note, sendJson);
    }


};

// curl -d "title=Hallo&priority=2" -X PATCH http://localhost:3000/api/notes/QZu6pPh6JpEebN8i
const update = function (request, response) {
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

    notesModel.update(request.params._id, note, sendJson);
};

module.exports = {
    index,
    show,
    store,
    update
};