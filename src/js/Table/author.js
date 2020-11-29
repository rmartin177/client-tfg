import {clearElement,addArrtoTable,addToTable} from '../utils'
import M from "materialize-css"

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
//funcion que se encarga de hacer la busqueda por nombre en la tabla de autores
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

//funcion que se encarga de escribir los autores en la tabla
export function writeAuthorsOnTable(json, paginaActualAutores, articulosPorPaginaAutores) {
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