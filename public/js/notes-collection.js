import {
    NoteService
} from "./notes-service.js";

class Note {
    constructor(note) {
        this.id = note._id;
        this.title = note.title;
        this.description = note.description;
        this.importance = note.importance;
        this.dueBy = note.dueBy;
        this.createdAt = note.createdAt;
        this.updatedAt = note.updatedAt;
    }
}

class NotesCollection {

    async getNotes(params) {
        const ns = new NoteService();
        return await ns.getNotes(params).then(function (x) {
            return x.map(note => new Note(note));
        });
    }
}

export {
    NotesCollection
}