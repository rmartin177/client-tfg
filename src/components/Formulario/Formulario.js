import React, { Fragment, useState } from 'react'
import "./Formulario.css"
import { deleteAuthor } from '../../js/utils'
import M from "materialize-css"
import axios from "../../config/axios"
import Spinner from '../Spinner/Spinner'

const Formulario = (props) => {

    const { setShow, setresult } = props;
    const [showSpinner, setSpinner] = useState(false);
    //Array con los nombre de los autores
    const autores = [];

    async function getJson(authors) {
        try {
            //RESULT LO CONVIERTES A JSON Y LO MUESTRAS EN TABLAS Y LO PERMITES DESCARGAR
            //conversion a Json y lo insertamos en el state para que la tabla pueda acceder a la info
            setresult(await axios.post("/api/getjson", authors));
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    //Funcion que se ejecuta cuando se pulsa el submit
    const saveAuthors = async (e) => {
        e.preventDefault();

        var nAutores = document.querySelectorAll("form .writeAuthor");
        nAutores.forEach((nombre) => {
            if (nombre.value !== "")
                autores.push(nombre.value);
        });

        //se comprueba que por lo menos haya un autor
        if (autores.length === 0) {
            var toastHTML = '<span class="errorEmpty">El campo autor está vacio.</span>';
            M.toast({ html: toastHTML, classes: 'rounded' });
        } else {
            //Activamos el spinner mientras carga la petición
            setSpinner(true);
            if (await getJson(autores)) {
                //cuando este todo ok damos paso a la siguiente panatalla y quitamos el spinner
                setSpinner(false);
                setShow(false);
            }
        }


    };

    const addAuthor = (e) => {
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
        label.innerHTML = "Nombre del autor:";
        label.setAttribute("hmtlFor", "author" + (number + 1));
        label.classList.add("black-text");

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

    return (
        <Fragment>
            <h1>
                TGF
            </h1>
            {
                showSpinner
                    ?
                    <div className="contenedor-principal">
                        <div>
                            Su petición se esta ejecutando, espere unos segundos...
                        </div>
                        <Spinner/>
                    </div>

                    :
                    <div className="contenedor-principal">
                        <form onSubmit={saveAuthors} className="col s12">

                            <div className="input-field col s12">
                                <label htmlFor="author1" className="black-text">Nombre del autor:</label>
                                <input type="text" className="writeAuthor validate" name="author1" />
                                <span className="deleted" role="img" aria-label="bin" onClick={(e) => { deleteAuthor(); e.preventDefault() }}>
                                    🗑️
                        </span>
                            </div>


                            <button className="btn green darken-3" onClick={addAuthor}>
                                <i className="material-icons left">add_circle_outline</i>
                        Añadir más autores
                    </button>
                            <div>
                                <input type="submit" id="send" className="btn" value="Aceptar" />
                            </div>
                        </form>
                    </div>
            }
        </Fragment>
    )
}

export default Formulario;