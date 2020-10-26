import M from "materialize-css"
// esta función es solo para el primer autor
export const deleteAuthor = () => {

    var nElements = document.querySelectorAll("form .writeAuthor").length;
    console.log(nElements);
    //miramos si hay mas de un elemento
    if (nElements < 2)
        M.toast({ html: 'Operación no permitida', classes: 'rounded' });
    else {
        //seleccionamos el primer autor y le borramos
        var label = document.querySelector("form label");
        var input = document.querySelector("form .writeAuthor");
        var span = document.querySelector("form span")
        label.remove();
        input.remove();
        span.remove();
    }
}

export const downloadObjectAsJson = (exportObj, exportName) => {
    var jsonPretty = syntaxHighlight(exportObj);  
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonPretty);
    var downloadAnchorNode = document.getElementById("downloadJson");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        return match;
    });
}
