import {
    NotesCollection
} from "./notes-collection.js";

const templateSource = $("#notes-list-template").html();
const template = Handlebars.compile(templateSource);
Handlebars.registerHelper("renderImportance", function (importance) {
    return '★'.repeat(importance);
});
Handlebars.registerHelper("checkFinished", function (finishedAt) {
    if (moment(finishedAt).isValid()) {
        return "checked";
    }
});

const nc = new NotesCollection();

nc.getNotes("orderby=createdAt&direction=DESC").then(function (notes) {
    renderNotes(notes);
});

let styleSelector = localStorage.getItem("style-selector") || "delta-default";
$("#css-switcher").attr({href : 'css/' + localStorage.getItem("style-selector") + '.css'});
$("#style-selector").val(styleSelector);

//addCSS('css/' + localStorage.getItem("style-selector") + '.css');

localStorage.setItem("style-selector", styleSelector);

$("#style-selector").on("change", function () {
    localStorage.setItem("style-selector", event.target.value);
    console.log("DROPDOWN");
    console.log(localStorage.getItem("style-selector"));
    //addCSS('css/' + localStorage.getItem("style-selector") + '.css');
    $("#css-switcher").attr({href : 'css/' + localStorage.getItem("style-selector") + '.css'});
});

$("#notes").on("click", function () {
    const id = String(event.target.id).substring(String(event.target.id).indexOf("-") + 1);

    if (id && String(event.target.id).startsWith("edit-")) {
        sessionStorage.setItem("note-id", id);
        window.location.replace("detail.html");
    }

    if (id && String(event.target.id).startsWith("finished-")) {
        if(event.target.checked === false) {
            nc.toggleFinishedAt(id, null).then(function (note) {
                nc.getNotes("orderby=createdAt&direction=DESC").then(function (notes) {
                    renderNotes(notes);
                });
            });

        } else {
            console.log(new Date().getTime());
            nc.toggleFinishedAt(id, new Date()).then(function (note) {
                nc.getNotes("orderby=createdAt&direction=DESC").then(function (notes) {
                    renderNotes(notes);
                });
            });

        }

    }
});

$("#new-note").on("click", function () {
    sessionStorage.setItem("note-id", "");
    window.location.replace("detail.html");
});

$("#sort-by-created-date").on("click", function () {
    nc.getNotes("orderby=createdAt&direction=DESC").then(function (notes) {
        renderNotes(notes);
    });
});

$("#sort-by-due-date").on("click", function () {
    nc.getNotes("orderby=dueBy&direction=DESC").then(function (notes) {
        renderNotes(notes);
    });
});

$("#sort-by-importance").on("click", function () {
    nc.getNotes("orderby=importance&direction=DESC").then(function (notes) {
        renderNotes(notes);
    });
});

function renderNotes(notes) {
    const context = {
        notes: notes
    };
    const html = template(context);

    $("#notes").children().remove();
    $("#notes").append(html);
}

/* function addCSS(filename) {
    var head = document.getElementsByTagName('head')[0];

    var style = document.createElement('link');
    style.href = filename;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = filename;
    head.append(style);
} */