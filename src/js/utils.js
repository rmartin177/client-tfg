import M from "materialize-css"
import { title } from "process";

//funcion que se encarga de añadir un nuevo input de autor
export const addAuthor = (e) => {
    //seleccionamos el formulario
    var form = document.querySelector("form > div");
    //antes de crear el input tenemos que asignarle bien el id de su name
    var inputs = document.querySelectorAll("form .writeAuthor");
    var lastChild = inputs[inputs.length - 1];
    var name = lastChild.getAttribute("name");
    var number = parseInt(name.split("r")[1]);

    //creamos el input
    var input = document.createElement("input");
    input.classList.add("writeAuthor");
    input.classList.add("validate");
    input.setAttribute("name", "author" + (number + 1));
    input.setAttribute("type", "text");
    //creamos la label
    var label = document.createElement("label");
    label.innerHTML = "Author Name:";
    label.setAttribute("hmtlFor", "author" + (number + 1));
    label.classList.add("white-text");

    //creamos el span que es donde ira el borrar 
    var span = document.createElement("span");
    span.innerText = "🗑️";
    span.classList.add("deleted");

    //cogemos todos los input que hay en la página para saber si se pueden borrar
    //añadimos la funcionalidad que hace que se borre el autor
    span.onclick = (e) => {
        var nElements = document.querySelectorAll("form .writeAuthor").length;
        if (nElements <= 1)
            M.toast({ html: 'Operación no permitida', classes: 'rounded' });
        else {
            label.remove();
            input.remove();
            span.remove();
        }
    }
    var div = document.createElement("div");
    div.classList.add("input-field");
    div.classList.add("col");
    div.classList.add("s12");

    //se lo insertamos
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(span);
    form.appendChild(div);
    e.preventDefault();
}

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
//limpia cualquier elemento
function clearElement(elm) {
    while (elm.lastElementChild) {
        elm.removeChild(elm.lastElementChild);
    }
}

//funcion que se encarga de que se expanda la fila
function expand(liAuthors) {

    //Por defecto dejamos que se muestren 2 autores
    if (liAuthors.length > 2) {
        //cogemos el 3 autor y comprobamos si se esta mostrando, si se esta mostrando cuando le demos click se tiene que dejar de ver y vicerversa
        if (liAuthors[2].classList.contains("non-display")) {//Hay que desplegarlos
            liAuthors.forEach(elm => {
                if (elm.classList.contains("non-display")) {
                    elm.classList.remove("non-display");
                    elm.classList.add("yes-display");
                }
                //cambia el texto del show more por show less
                if (elm.classList.contains("show")) {
                    elm.innerText = "Show less...";
                }
            });
        } else {//hay que encogerlos
            liAuthors.forEach((elm, index) => {
                if (index > 1) {
                    if (elm.classList.contains("yes-display")) {
                        elm.classList.remove("yes-display");
                        elm.classList.add("non-display");
                    }
                }
                //cambia el texto del show more por show less
                if (elm.classList.contains("show")) {
                    elm.innerText = "Show more...";
                }
            });
        }
    }
}

//funcion que inserta en la tabla un listado de elementos sobre todo util para los autores
function addArrtoTable(type, table) {
    var td = document.createElement("td");
    var ul = document.createElement("ul");

    Object.entries(type).forEach(([key, value]) => {
        let li = document.createElement("li");
        li.innerText = "■ " + key + ": " + value;
        ul.appendChild(li);
    });
    td.appendChild(ul);
    table.appendChild(td);
}

//funcion que se encarga de escribir los autores en la tabla
function writeAuthorsOnTable(json, paginaActualAutores, articulosPorPaginaAutores) {
    //--- pestaña autores ---
    var nAutores = paginaActualAutores * articulosPorPaginaAutores;
    //cogemos todas las filas de la tabla , nos ponemos en la ultima y vamos añadiendo segun leemos el json
    var dataTableAuthors = document.querySelector("#dataTableAuthors");
    //borramos la tabla para poder mostrar las cosas sin que se solapen
    clearElement(dataTableAuthors);
    var inicio = (paginaActualAutores - 1) * articulosPorPaginaAutores;
    
    for (let index = inicio; index < nAutores ; ++index) {
        auxAuthorsWrite(json,index,dataTableAuthors);
    }

}

//funcion auxiliar que se usa para escribir los autores en la tabla
function auxAuthorsWrite(json,index,dataTableAuthors){
    var elm = json.authors[index];
    if(elm !== undefined){
        var tableHeadAuthors = document.createElement("tr");
        //--- Name ---
        addToTable(elm.name, tableHeadAuthors);
        //--- Indices ---
        addArrtoTable(elm.indices, tableHeadAuthors);
        //--- Citas ---
        addArrtoTable(elm.citas, tableHeadAuthors);
        //--- Jcr ---
        addArrtoTable(elm.jcr, tableHeadAuthors);
        //--- Ggs ---
        addArrtoTable(elm.ggs, tableHeadAuthors);
        //--- Core ---
        addArrtoTable(elm.core, tableHeadAuthors);
    
        dataTableAuthors.appendChild(tableHeadAuthors);
    }
}
//funcion auxiliar que se usa para escribir publicaciones en la tabla publications
function auxPublicationsWrite(json, index, dataTableElements) {
    var elm = json.publications[index];
    if (elm !== undefined) {

        let tableHead = document.createElement("tr");
        //--- type ---
        addToTable(elm.type, tableHead);

        //--- autores ---
        //Creamos las filas de las tablas y en la de autores creamos una lista
        let tdAuthors = document.createElement("td");
        let ulAuthors = document.createElement("ul");
        elm.authors.forEach((author, i) => {
            //Para una funcionalidad de js solo debo mostrar 2 autores y con el click mostrar todos
            let li = document.createElement("li");
            li.innerText = "■ " + author;
            //cuando haya mas de dos les añadimos una clase non-display que no dejara que se vea
            if (i > 1)
                li.classList.add("non-display");

            ulAuthors.appendChild(li);

            if (i == elm.authors.length - 1 && elm.authors.length > 2) {
                let showMore = document.createElement("li");
                showMore.innerText = "Show more...";
                showMore.classList.add("show");
                showMore.classList.add("blue-text");
                ulAuthors.appendChild(showMore);
            }
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

        //--- (A)Journal/(I)Book_title ---
        if (elm.type === "Articles") {
            addToTable(elm.journal, tableHead);
        } else {
            //--- book title ---
            addToTable(elm.book_title, tableHead);
        }

        //--- acronym ---
        addToTable(elm.acronym, tableHead);

        //--- core ---
        let tdCore = document.createElement("td");
        let ulCore = document.createElement("ul");
        let liYearCore = document.createElement("li");
        liYearCore.innerText = elm.core ? elm.core.core_year : "";
        let liCategoryCore = document.createElement("li");
        liCategoryCore.innerText = elm.core ? elm.core.core_category : "-";
        ulCore.appendChild(liYearCore);
        ulCore.appendChild(liCategoryCore);
        tdCore.appendChild(ulCore);
        tableHead.appendChild(tdCore);

        //--- ggs ---
        let tdggs = document.createElement("td");
        let ulggs = document.createElement("ul");
        let liYearGgs = document.createElement("li");
        liYearGgs.innerText = elm.ggs ? elm.ggs.year : "";
        let liClassGgs = document.createElement("li");
        liClassGgs.innerText = elm.gss ? elm.ggs.class : "-";
        ulggs.appendChild(liYearGgs);
        ulggs.appendChild(liClassGgs);
        tdggs.appendChild(ulggs);
        tableHead.appendChild(tdggs);


        //se le agrega la funcionalidad de desplegado a cada fila
        let liAuthors = tableHead.querySelectorAll(".authors_ ul > li");
        tableHead.onclick = () => expand(liAuthors);
        //Se agrega toda la fila a la tabla
        dataTableElements.appendChild(tableHead);
    }
}
//funcion que se encarga de escribir las publicaciones en la tabla
function writePublicationOnTable(json, paginaActualPublicaciones, articulosPorPaginaPublicaciones) {
    var nPublicaciones = paginaActualPublicaciones * articulosPorPaginaPublicaciones;
    //cogemos todas las filas de la tabla , nos ponemos en la ultima y vamos añadiendo segun leemos el json
    var dataTableElements = document.querySelector("#dataTablePublications");
    //borramos la tabla para poder mostrar las cosas sin que se solapen
    clearElement(dataTableElements);

    var inicio = (paginaActualPublicaciones - 1) * articulosPorPaginaPublicaciones;
    var elm = json.publications[0];

    for (let index = inicio; index < nPublicaciones && elm !== undefined; ++index) {
        auxPublicationsWrite(json, index, dataTableElements);
    }
}
//Esta funcion se encarga de escribir el json en las tablas
export const writeOnTable = (json, paginaActualAutores, articulosPorPaginaAutores, paginaActualPublicaciones, articulosPorPaginaPublicaciones) => {

    //--- Authors ---
    writeAuthorsOnTable(json, paginaActualAutores, articulosPorPaginaAutores);

    //--- pestaña publications ---
    writePublicationOnTable(json, paginaActualPublicaciones, articulosPorPaginaPublicaciones);

}


//funcion que se encarga de hacer la busqueda por titulo
export const searchOnTablePublications = (json) => {
    var input, filter;
    //cogemos lo que escribe el usuario
    input = document.getElementById("myInputPublications");
    //lo pasamos a mayusuculas
    filter = input.value.toUpperCase();

    //desactivo paginacion

    /* if(input === "")
         document.getElementsByClassName("pages").classList.remove("non-display");*/

    var dataTableElements = document.querySelector("#dataTablePublications");
    //borramos la tabla para poder mostrar las cosas sin que se solapen
    clearElement(dataTableElements);

    for (let index = 0; index < json.publications.length; ++index) {
        if (json.publications[index].title.toUpperCase().includes(filter))
            auxPublicationsWrite(json, index, dataTableElements);
    }
}

//funcion que se encarga de hacer la busqueda por nombre
export const searchOnTableAuthors = (json) => {
    var input, filter;
    //cogemos lo que escribe el usuario
    input = document.getElementById("myInputAuthors");
    //lo pasamos a mayusuculas
    filter = input.value.toUpperCase();

    //desactivo paginacion

    /* if(input === "")
         document.getElementsByClassName("pages").classList.remove("non-display");*/

    var dataTableElements = document.querySelector("#dataTableAuthors");
    //borramos la tabla para poder mostrar las cosas sin que se solapen
    clearElement(dataTableElements);
    var elm = json.authors[0];
    for (let index = 0; index < json.authors.length && elm !== undefined; ++index) {
        if (json.authors[index].name.toUpperCase().includes(filter))
            auxAuthorsWrite(json, index, dataTableElements);
        elm = json.authors[index];
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