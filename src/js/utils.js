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
        return "-";
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

    var n = paginaActual * articulosPorPagina;

    //cogemos todas las filas de la tabla , nos ponemos en la ultima y vamos añadiendo segun leemos el json
    var dataTableElements = document.querySelector("#dataTablePublications");
    //borramos la tabla para poder mostrar las cosas sin que se solapen
    clearElement(dataTableElements);
    var inicio = (paginaActual - 1) * articulosPorPagina;

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
            li.innerText = "■ " + author;
            ulAuthors.appendChild(li);
        });
        tdAuthors.classList.add("authors_");
        tdAuthors.setAttribute("list", "true");
        tdAuthors.appendChild(ulAuthors);
        tableHead.appendChild(tdAuthors);

        //--- title ---
        let td = document.createElement("td");
        td.innerText = exist(elm.title);
        td.classList.add("title_");
        td.setAttribute("list", "false");
        tableHead.appendChild(td);

        //--- pages ---
        addToTable(elm.pages, tableHead);

        //--- year ---
        addToTable(elm.year, tableHead);

        //--- Volume ---
        addToTable(elm.volume, tableHead);

        //--- Issue ---
        addToTable(elm.issue, tableHead);

        //--- book title ---
        addToTable(elm.book_title, tableHead);

        //--- quotes ---
        let tdQuotes = document.createElement("td");
        tdQuotes.innerText = "Siguiente Spring";
        tableHead.appendChild(tdQuotes);

        //--- core ---
        let tdCore = document.createElement("td");
        tdCore.innerText = "Siguiente Spring";
        tableHead.appendChild(tdCore);

        //--- ggs ---
        let tdggs = document.createElement("td");
        let ulggs = document.createElement("ul");
        if(elm.gss){
            elm.gss.forEach(element => {
                let li = document.createElement("li");
                li.innerText = "■ " + element;
                ulggs.appendChild(li);
            });
        }else{
            ulggs.innerText="-";
        }
        tdggs.appendChild(ulggs);
        tableHead.appendChild(tdggs);
        

        //Se agrega toda la fila a la tabla
        dataTableElements.appendChild(tableHead);
    }
}

//funcion que se encarga de hacer la busqueda por autor y titulo
export const searchOnTable = () => {
    var input, filter, table, tr, tds, i, txtValue;
    //cogemos lo que escribe el usuario
    input = document.getElementById("myInputPublications");
    //lo pasamos a mayusuculas
    filter = input.value.toUpperCase();
    //cogemos las filas de la tabla
    table = document.getElementById("tablePublications");
    tr = table.getElementsByTagName("tr");
    // recorres las filas y columnas que contengan las clases que queremos
    //empieza en 1 por que tb coge los titulos de las tablas 
    for (i = 1; i < tr.length; i++) {
        tds = tr[i].querySelectorAll(".title_,.authors_");
        console.log(filter);
        //buscamos en cada una de las columnas de la fila en cuestion
        for (let j = 0; j < tds.length; j++) {
            if (tds[j]) {
                //ahora miramos si nos encontramos en los autores o en el titulo gracias al atributo list
                let listOrNot = tds[j].getAttribute("list");
                if (listOrNot === "true"){
                    let liAuthors = tds[j].getElementsByTagName("li");
                    for (let index = 0; index < liAuthors.length; index++) {
                        txtValue = liAuthors[index].textContent || liAuthors[index].innerText;
                        console.log("En autores: " + txtValue + " tamaño array autores: " + liAuthors.length);
                        if (txtValue.toUpperCase().includes(filter)) {
                            tr[i].style.display = "";
                            console.log("coincide");
                        }else{
                            tr[i].style.display = "none";
                            console.log("coincide");

                        }
                    }
                } else { //estamos en los autores por tanto hay que recorrerlos y en cuanto encontremos una que coincide mostramos la fila
                    txtValue = tds[j].textContent || tds[j].innerText;
                    console.log("En titulo: " + txtValue);
                    if (txtValue.toUpperCase().includes(filter)) {
                        tr[i].style.display = "";
                        console.log("coincide en titulo");
                    } else {
                        tr[i].style.display = "none";   
                        console.log("no coincide en titulo");                     
                    }
                }
            }
        }
    }
}

//funcion que se usa en las pestañas
export const tabsFunction = (id) => {
    var tabcontent, tablinks;
    //oculta todo el contenido de las pestañas
    tabcontent = document.getElementsByClassName("tabContent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // quita la clase activo de las pestañas
    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    // le añade activo a la que estamos pulsando y la enseña
    var current = document.getElementById(id);
    current.style.display = "block";
    current.classList.add("active");
}