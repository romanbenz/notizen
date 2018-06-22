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

// curl -d "title=Hallo&priority=2" -X POST http://localhost:3000/api/notes
const store = function (request, response) {
    console.log("STORE");
    console.log(request.body);
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

    if (request.body._id) {
        notesModel.update(request.body._id, note, sendJson);
    } else {
        notesModel.save(note, sendJson);
    }
};

// curl -d "title=Hallo&priority=2" -X PATCH http://localhost:3000/api/notes/QZu6pPh6JpEebN8i
const update = function (request, response) {
    /* const note = {
        title: request.body.title || "Missing title",
        description: request.body.description,
        importance: request.body.importance || 1,
        dueBy: request.body.dueBy,
        finishedAt: request.body.finishedAt
        //finishedAt: Date.now()
    }
 */
    const note = request.body;
    console.log(note);

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