const source = $("#notes-list-template").html();
const template = Handlebars.compile(source);
let notes;


$.get("api/notes", function (data) {
    //alert(JSON.stringify(data));

    notes = data || [];

    const context = {
        notes: notes
    };
    const html = template(context);

    $("#notes").append(html);


    //const notes = [];


});

//const notes = JSON.parse(sessionStorage.getItem("notes")) || [];

/*  */
/*const editButtonEventHandler = function () {

                                        }*/

$("#notes").on("click", function () {
    sessionStorage.setItem("note-id", String(event.target.id).substring(5));
    window.location.replace("detail.html");
});
$("#new-note").on("click", function () {
    sessionStorage.setItem("note-id", "");
    window.location.replace("detail.html");
});
$("#sort-by-created-date").on("click", function () {
    //notes = data || [];
    function compare(a, b) {
        if (a.createdAt < b.createdAt)
            return -1;
        if (a.createdAt > b.createdAt)
            return 1;
        return 0;
    }

    notes.sort(compare);

    const context = {
        notes: notes
    }
    const html = template(context);

    $("#notes").children().remove();

    $("#notes").append(html);
});

$("#sort-by-due-date").on("click", function () {
    //notes = data || [];
    function compare(a, b) {
        if (a.dueBy < b.dueBy)
            return -1;
        if (a.dueBy > b.dueBy)
            return 1;
        return 0;
    }

    notes.sort(compare);

    const context = {
        notes: notes
    }
    const html = template(context);

    $("#notes").children().remove();

    $("#notes").append(html);
});

$("#sort-by-importance").on("click", function () {
    //notes = data || [];
    function compare(a, b) {
        if (a.importance < b.importance)
            return -1;
        if (a.importance > b.importance)
            return 1;
        return 0;
    }

    notes.sort(compare);

    const context = {
        notes: notes
    }
    const html = template(context);

    $("#notes").children().remove();

    $("#notes").append(html);
});