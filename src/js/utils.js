export function addAuthor(){
    //seleccionamos el formulario
    var formulario = document.querySelector("form > div");
    
    //creamos la label y añadimos la clase white
    var label = document.createElement("label");
    label.innerHTML = "Introduce el nombre del autor:";
    label.classList.add("white");

    //creamos el input y le ponemos la case en css
    var input = document.createElement("input");
    input.classList.add("writeAuthor");

    //creamos el span que es donde ira el borrar 
    var span = document.createElement("span");
    span.innerText="🗑️";
    span.classList.add("deleted");

    //añadimos la funcionalidad que hace que se borre el autor
    span.onclick = (e)=>{
        input.remove();
        label.remove();
        span.remove();
        e.preventDefault();
    }
    //se lo insertamos
    formulario.appendChild(label);
    formulario.appendChild(input);
    formulario.appendChild(span);
}

export const deleteAuthor = () =>{
    alert("Operación no permitida");
}

