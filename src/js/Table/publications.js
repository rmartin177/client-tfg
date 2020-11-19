import {clearElement,addToTable,expand,exist} from '../utils'

//funcion que se encarga de hacer la busqueda por titulo en publicaciones
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

//funcion que se encarga de escribir las publicaciones en la tabla
export function writePublicationOnTable(json, paginaActualPublicaciones, articulosPorPaginaPublicaciones) {
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
        ulggs.appendChild(liYearGgs);
        tdggs.appendChild(ulggs);
        tableHead.appendChild(tdggs);


        //se le agrega la funcionalidad de desplegado a cada fila
        let liAuthors = tableHead.querySelectorAll(".authors_ ul > li");
        tableHead.onclick = () => expand(liAuthors);
        //Se agrega toda la fila a la tabla
        dataTableElements.appendChild(tableHead);
    }
}
