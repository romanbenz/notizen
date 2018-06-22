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

    setNote(note) {
        return $.post("api/notes", $.param(note));
    }

    newNote(note) {
        //alert(note);
        return $.post("api/notes", $.param(note));
    }

    updateNote(id, note) {
        console.log(note);
        return $.ajax({
            method: "PATCH",
            url: "api/notes/" + id,
            data: $.param(note)
        })

        //return $.put("api/notes/" + id, $.param(note));
    }

}

export {
    NoteService
}