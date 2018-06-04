$(function () {
    $("#dueBy").datepicker();
});

const id = sessionStorage.getItem("note-id") || null;

if (id) {
    $.get("api/notes/" + id, function (data) {
        $("#id").val(data._id);
        $("#title").val(data.title);
        $("#description").val(data.description);
        $("#importance").val(data.importance);
        $("#dueBy").val(data.dueBy);
    });
}
$("#submit").on("click", function () {
    $.post("api/notes", $("#note").serialize(), function (data) {

        const notes = JSON.parse(sessionStorage.getItem("notes")) || [];
        notes.push(data);
        sessionStorage.setItem("notes", JSON.stringify(notes));
        window.location.replace("index.html");

    });
});
