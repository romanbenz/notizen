import {
    NotesCollection
} from "./notes-collection.js";

const nc = new NotesCollection();

const templateSource = $("#notes-list-template").html();
const template = Handlebars.compile(templateSource);

Handlebars.registerHelper("renderImportance", function (position, importance) {
    if (Number(position) === Number(importance)) {
        return "selected";
    } else {
        return "";
    }
});

(function () {
    const id = sessionStorage.getItem("note-id") || null;

    if (id) {
        nc.getNoteById(id).then(function (note) {
            renderNote(note);
        });
    } else {
        renderNote();
    }
}());

$("#css-switcher").attr({
    href: 'css/' + localStorage.getItem("style-selector") + '.css'
});

$("#notes").on("click", function (event) {
    if (String(event.target.id) === "submit") {
        if ($("#_id").val()) {
            nc.updateNote(
                $("#_id").val(),
                $("#title").val(),
                $("#description").val(),
                $("#importance").val(),
                $("#dueBy").val(),
            ).then(function () {
                window.location.replace("index.html");
            });
        } else {
            nc.newNote(
                $("#title").val(),
                $("#description").val(),
                $("#importance").val(),
                $("#dueBy").val(),
            ).then(function () {
                window.location.replace("index.html");
            });
        }
    }
    if (String(event.target.id) === "reset") {
        window.location.replace("index.html");
    }

});

function renderNote(notes) {
    const html = template(notes);

    $("#notes").children().remove();
    $("#notes").append(html);

    $("#dueBy").datepicker({
        dateFormat: $.datepicker.ISO_8601
    });
}