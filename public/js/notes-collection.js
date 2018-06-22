import {
    NoteService
} from "./notes-service.js";

class Note {

    /* constructor(note) {
        this._id = note._id;
        this.title = note.title;
        this.description = note.description;
        this.importance = note.importance;
        this.dueBy = note.dueBy;
        this.finishedAt = new Date(note.finishedAt);
        this.createdAt = note.createdAt;
        this.updatedAt = note.updatedAt;
    } */
    constructor(_id, title, description, importance, dueBy, finishedAt, createdAt, updatedAt) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueBy = dueBy;
        this.finishedAt = new Date(finishedAt);
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getDueByFromNow() {
        if (this.dueBy) {
            return moment(this.dueBy).fromNow();
        } else {
            return "Sometimes in the future";
        }
    }

    getFinishedAtFromNow() {
        if (moment(this.finishedAt).isValid()) {
            return moment(this.finishedAt).fromNow();
        } else {
            return "";
        }
    }
}

class NotesCollection {

    async getNotes(params) {
        const ns = new NoteService(); // TODO: zu Property machen
        return await ns.getNotes(params).then(function (notes) {
            return notes.map(note => new Note(note._id, note.title, note.description, note.importance, note.dueBy, note.finishedAt, note.createdAt, note.updatedAt));
        });
    }

    async getNoteById(id) {
        const ns = new NoteService();
        return await ns.getNoteById(id).then(function (note) {
            return new Note(note._id, note.title, note.description, note.importance, note.dueBy, note.finishedAt, note.createdAt, note.updatedAt);
        });
    }

    async newNote(title, description, importance, dueBy) {
        const ns = new NoteService();
        // return await ns.newNote(new Note(this.objectifyFormArray(note))).then(function (x)
        return await ns.newNote({
            title: title,
            description: description,
            importance: importance,
            dueBy: dueBy
        }).then(function() {
            return;
        });
    }

    async updateNote(_id, title, description, importance, dueBy) {
        const ns = new NoteService();
        //         return await ns.updateNote(id, new Note(this.objectifyFormArray(note))).then(function (x)
        return await ns.updateNote(_id, {
            title: title,
            description: description,
            importance: importance,
            dueBy: dueBy
        }).then(function() {
            return;
        });
    }

    async toggleFinishedAt(_id, finishedAt) {
        const ns = new NoteService();
        //         return await ns.updateNote(id, new Note(this.objectifyFormArray(note))).then(function (x)

        return await ns.updateNote(_id, {
            finishedAt: finishedAt
        }).then(function (note) {
            console.log(note);
            return note;
        });
    }

    /* objectifyFormArray(formArray) { //TODO: Methode verbessern

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        return returnArray;
    } */

}

export {
    NotesCollection
}