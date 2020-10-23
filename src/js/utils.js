import M from "materialize-css"
// esta función es solo para el primer autor
export const deleteAuthor = () => {
    

    var nElements = document.querySelectorAll("form .writeAuthor").length;
    console.log(nElements);
    //miramos si hay mas de un elemento
    if (nElements < 2)
         M.toast({html: 'Operación no permitida', classes: 'rounded'});
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

