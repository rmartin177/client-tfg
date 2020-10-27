import M from "materialize-css"

// esta función es solo para darle funcionalidad(borrado y no permitir que se borre si el unico) al primer input de autor
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

//Esta funcion se encarga de todo lo que es la parte de descargar el json
export const downloadObjectAsJson = (exportObj, exportName) => {
    var jsonPretty = syntaxHighlight(exportObj);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonPretty);
    var downloadAnchorNode = document.getElementById("downloadJson");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
}

//Esta funcion pone el json bonito
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        return match;
    });
}

//funcion que comprueba si existe el elemento y te devuelve eso o lo pone a null
function exist(obj) {
    if (obj)
        return obj;
    else
        return "null";
}

//funcion que agrega un elmento a la fila de una tabla
function addToTable(elm, table) {
    let td = document.createElement("td");
    td.innerText = exist(elm);
    table.appendChild(td);
}

function clearElement(elm) {
    while (elm.lastElementChild) {
        elm.removeChild(elm.lastElementChild);
    }
}

//Esta funcion se encarga de escribir el json en las tablas
export const writeAuthorOnTable = (json, paginaActual, articulosPorPagina) => {

    console.log(json);
    var n = paginaActual * articulosPorPagina;

    //cogemos todas las filas de la tabla , nos ponemos en la ultima y vamos añadiendo segun leemos el json
    var dataTableElements = document.querySelector("#dataTablePublications");
    //borramos la tabla para poder mostrar las cosas sin que se solapen
    clearElement(dataTableElements);
    var inicio = (paginaActual - 1) * articulosPorPagina;

    console.log(inicio + "-" + n);
    for (let index = inicio; index < n; index++) {
        let tableHead = document.createElement("tr");
        const elm = json.publications[index];
        //--- type ---
        addToTable(elm.type, tableHead);

        //--- autores ---
        //Creamos las filas de las tablas y en la de autores creamos una lista
        let tdAuthors = document.createElement("td");
        let ulAuthors = document.createElement("ul");
        elm.authors.forEach(author => {
            let li = document.createElement("li");
            li.innerText = "■" + author;
            ulAuthors.appendChild(li);
        });
        tdAuthors.appendChild(ulAuthors);
        tableHead.appendChild(tdAuthors);

        //--- title ---
        addToTable(elm.title, tableHead);

        //--- pages ---
        addToTable(elm.pages, tableHead);

        //--- year ---
        addToTable(elm.year, tableHead);

        //--- Volume ---
        addToTable(elm.volume, tableHead);

        //---Issue ---
        addToTable(elm.issue, tableHead);

        //--- book title ---
        addToTable(elm.book_title, tableHead);

        //Se agrega toda la fila a la tabla
        dataTableElements.appendChild(tableHead);
    }
}

export const searchOnTable = () => {
    var input, filter, table, tr, tds, i, txtValue;
    input = document.getElementById("myInputPublications");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablePublications");
    tr = table.getElementsByTagName("tr");

    //  recorres las filas y la que no coincida no la muestras
    for (i = 0; i < tr.length; i++) {
        tds = tr[i].getElementsByTagName("td");
        for (let j = 0; j < tds.length; j++) {
            if (tds[j]) {
                txtValue = tds[j].textContent || tds[j].innerText;
                if (txtValue.toUpperCase().includes(filter)) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
            
        }
    }

} 