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
        elm.authors.forEach((author,index) => {
            //Para una funcionalidad de js solo debo mostrar 2 autores y con el click mostrar todos
            let li = document.createElement("li");
            li.innerText = "■ " + author;
            //cuando haya mas de dos les añadimos una clase non-display que no dejara que se vea
            if(index > 1)
                li.classList.add("non-display");

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
        /*if(elm.gss){
            elm.gss.forEach(element => {
                let li = document.createElement("li");
                li.innerText = "■ " + element;
                ulggs.appendChild(li);
            });
        }else{
            ulggs.innerText="-";    
        }
        tdggs.appendChild(ulggs);
        tableHead.appendChild(tdggs);*/
        

        //se le agrega la funcionalidad de desplegado a cada fila
        tableHead.onclick= ()=>{
            //cogemos los autores de la fila
            let liAuthors = tableHead.querySelectorAll(".authors_ ul > li");
            //Por defecto dejamos que se muestren 2 autores
            if(liAuthors.length > 2){
                //cogemos el 3 autor y comprobamos si se esta mostrando, si se esta mostrando cuando le demos click se tiene que dejar de ver y vicerversa
                if(liAuthors[2].classList.contains("non-display")){//Hay que desplegarlos
                    liAuthors.forEach(elm=>{
                        if(elm.classList.contains("non-display")){
                            elm.classList.remove("non-display");
                            elm.classList.add("yes-display");
                        }
                    });
                }else{//hay que encogerlos
                    liAuthors.forEach((elm,index)=>{
                        if(index > 1){
                            if(elm.classList.contains("yes-display")){
                                elm.classList.remove("yes-display");
                                elm.classList.add("non-display");
                            }
                        }
                    });
                }
            }
        };
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
                        }else{
                            tr[i].style.display = "none";
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