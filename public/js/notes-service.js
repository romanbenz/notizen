class NoteService {

    getNotes(params) {
        if (params) {
            params = "?" + params;
        }

        return $.getJSON("api/notes" + params);
    }

    getNoteById(id) {
        return $.getJSON("api/notes/" + id);
    }

    newNote(note) {
        return $.post("api/notes", $.param(note));
    }

    updateNote(id, note) {
        return $.ajax({
            method: "PATCH",
            url: "api/notes/" + id,
            data: $.param(note)
        })
    }

}

export {
    NoteService
}