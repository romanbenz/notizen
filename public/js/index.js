import {
    NotesCollection
} from "./notes-collection.js";

const templateSource = $("#notes-list-template").html();
const template = Handlebars.compile(templateSource);

const nc = new NotesCollection();

nc.getNotes("orderby=createdAt&direction=DESC").then(function (notes) {
    drawNotes(notes);
});

$("#notes").on("click", function () {
    if (String(event.target.id).substring(5)) {
        sessionStorage.setItem("note-id", String(event.target.id).substring(5));
        window.location.replace("detail.html");
    }
});

$("#new-note").on("click", function () {
    sessionStorage.setItem("note-id", "");
    window.location.replace("detail.html");
});

$("#sort-by-created-date").on("click", function () {
    nc.getNotes("orderby=createdAt&direction=DESC").then(function (notes) {
        drawNotes(notes);
    });
});

$("#sort-by-due-date").on("click", function () {
    nc.getNotes("orderby=dueBy&direction=DESC").then(function (notes) {
        drawNotes(notes);
    });
});

$("#sort-by-importance").on("click", function () {
    nc.getNotes("orderby=importance&direction=DESC").then(function (notes) {
        drawNotes(notes);
    });
});

function drawNotes(notes) {
    const context = {
        notes: notes
    };
    const html = template(context);

    $("#notes").children().remove();
    $("#notes").append(html);
}