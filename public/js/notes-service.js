class NoteService {

    getNotes(params) {
        console.log(params);
        if(params) {
            params = "?" + params;
        }

        return $.getJSON("api/notes" + params);
    }
}

export {
    NoteService
}