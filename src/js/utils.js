//Esta funcion pone el json bonito
export function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g, function (match) {
        return match;
    });
}

//funcion que comprueba si existe el elemento y te devuelve eso o lo pone a null
export function exist(obj) {
    if (obj)
        return obj;
    else
        return "-";
}

//funcion que agrega un elmento a la fila de una tabla
export function addToTable(elm, table) {
    let td = document.createElement("td");
    td.innerText = exist(elm);
    table.appendChild(td);
}
//limpia cualquier elemento
export function clearElement(elm) {
    while (elm.lastElementChild) {
        elm.removeChild(elm.lastElementChild);
    }
}

//funcion que se encarga de que se expanda la fila
export function expand(liAuthors) {

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
export function addArrtoTable(type, table) {
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
