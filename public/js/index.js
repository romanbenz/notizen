import {
    NotesCollection
} from "./notes-collection.js";

const nc = new NotesCollection();

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

nc.getNotes(getOrderPattern() + getFilterPattern()).then(function (notes) {
    renderNotes(notes);
});

localStorage.setItem("style-selector", localStorage.getItem("style-selector") || "delta-default");
$("#css-switcher").attr({
    href: 'css/' + localStorage.getItem("style-selector") + '.css'
});
$("#style-selector").val(localStorage.getItem("style-selector"));

$("#style-selector").on("change", function () {
    localStorage.setItem("style-selector", event.target.value);
    $("#css-switcher").attr({
        href: 'css/' + localStorage.getItem("style-selector") + '.css'
    });
});

$("#notes").on("click", function (event) {
    const id = String(event.target.id).substring(String(event.target.id).indexOf("-") + 1);

    if (id && String(event.target.id).startsWith("edit-")) {
        sessionStorage.setItem("note-id", id);
        window.location.replace("detail.html");
    }

    if (id && String(event.target.id).startsWith("finished-")) {
        if (event.target.checked === false) {
            nc.toggleFinishedAt(id, null).then(function () {
                nc.getNotes(getOrderPattern() + getFilterPattern()).then(function (notes) {
                    renderNotes(notes);
                });
            });

        } else {
            nc.toggleFinishedAt(id, new Date()).then(function () {
                nc.getNotes(getOrderPattern() + getFilterPattern()).then(function (notes) {
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
    nc.getNotes(getOrderPattern("createdAt") + getFilterPattern()).then(function (notes) {
        renderNotes(notes);
    });
});

$("#sort-by-due-date").on("click", function () {
    nc.getNotes(getOrderPattern("dueBy") + getFilterPattern()).then(function (notes) {
        renderNotes(notes);
    });
});

$("#sort-by-importance").on("click", function () {
    nc.getNotes(getOrderPattern("importance") + getFilterPattern()).then(function (notes) {
        renderNotes(notes);
    });
});

$("#filter-by-finished").on("click", function () {
    nc.getNotes(getOrderPattern() + getFilterPattern("finishedAt")).then(function (notes) {
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

function getOrderPattern(field) {
    sessionStorage.setItem("order-by", sessionStorage.getItem("order-by") || "createdAt" ); 
    sessionStorage.setItem("direction", sessionStorage.getItem("direction") || "DESC" ); 

    if (field) {
        if (sessionStorage.getItem("order-by") === field) {
            if (sessionStorage.getItem("direction") === "DESC") {
                sessionStorage.setItem("direction", "ASC");
            } else {
                sessionStorage.setItem("direction", "DESC");
            }
        } else {
            sessionStorage.setItem("order-by", field);
            sessionStorage.setItem("direction", "DESC");
        }
    }

    return "orderby=" + sessionStorage.getItem("order-by") + "&direction=" + sessionStorage.getItem("direction");
}

function getFilterPattern(field) {
    sessionStorage.setItem("filter-by-finished", sessionStorage.getItem("filter-by-finished") || "false");

    if (field === "finishedAt") {
        if (sessionStorage.getItem("filter-by-finished") === "false") {
            sessionStorage.setItem("filter-by-finished", "true");
        } else {
            sessionStorage.setItem("filter-by-finished", "false");
        }
    }

    if (sessionStorage.getItem("filter-by-finished") === "false") {
        return "";
    } else {
        return "&filterbyfinished=true";
    }
}