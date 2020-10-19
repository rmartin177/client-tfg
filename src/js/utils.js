export function addAuthor() {
    //seleccionamos el formulario
    var formulario = document.querySelector("form > div");

    //antes de crear el input haremos una cuenta de los que hay 
    var nElements = document.querySelectorAll("form .writeAuthor").length;

    //creamos el input y le ponemos la case en css
    var input = document.createElement("input");
    input.classList.add("writeAuthor");
    input.setAttribute("Name", "author" + (nElements + 1));
    input.setAttribute("placeholder","Introduce el nombre del autor");

    //creamos el span que es donde ira el borrar 
    var span = document.createElement("span");
    span.innerText = "🗑️";
    span.classList.add("deleted");

    //cogemos todos los input que hay en la página para saber si se pueden borrar

    //añadimos la funcionalidad que hace que se borre el autor
    span.onclick = (e) => {
        var nElements = document.querySelectorAll("form .writeAuthor").length;

        if (nElements + 1 <= 1)
            alert("Operación no permitida");
        else {
            input.remove();
            span.remove();
        }
        e.preventDefault();
    }
    //se lo insertamos
    formulario.appendChild(input);
    formulario.appendChild(span);
}

// esta función es solo para el primer autor
export const deleteAuthor = () => {
    var nElements = document.querySelectorAll("form .writeAuthor").length;
    console.log(nElements);
    //miramos si hay mas de un elemento
    if (nElements < 2)
        alert("Operación no permitida");
    else {
        //seleccionamos el primer autor y le borramos
        var label = document.querySelector("form  label");
        var input = document.querySelector("form .writeAuthor");
        var span = document.querySelector("form span")
        label.remove(); 
        input.remove();
        span.remove();
    }
}

