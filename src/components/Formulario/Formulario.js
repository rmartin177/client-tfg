import React, { Fragment, useState } from 'react'
import "./Formulario.css"
import { deleteAuthor } from '../../js/utils'
import M from "materialize-css"
import axios from "../../config/axios"

const Formulario = (props) => {

    const {setmostrar} = props;
    //Array con los nombre de los autores
    const autores = [];

    async function getJson(authors){
        try{
            const results = axios.post("/api/getjson", authors)
            //RESULT LO CONVIERTES A JSON Y LO MUESTRAS EN TABLAS Y LO PERMITES DESCARGAR
        }catch(error){
            console.log(error)
        }
        
    }

    //Funcion que se ejecuta cuando se escribe en algun input
    const guardarAutores = async (e) => {
        e.preventDefault();

        var nAutores = document.querySelectorAll("form .writeAuthor");
        nAutores.forEach((nombre) => {
            if (nombre.value !== "")
                autores.push(nombre.value);
        });

        setmostrar(false);
        await getJson(autores)
    };

    const addAuthor = (e) => {
        //seleccionamos el formulario
        var formulario = document.querySelector("form > div");
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
        label.setAttribute("for", "author" + (number + 1));
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
        formulario.appendChild(div);
        e.preventDefault();
    }

    return (
        <Fragment>
            <h1>
                Formulario
            </h1>

            <div id="contenedor-principal">
                <form onSubmit={guardarAutores} className="col s12">

                    <div className="input-field col s12">
                        <label for="author1" className="black-text">Nombre del autor:</label>
                        <input type="text" className="writeAuthor validate" name="author1" />
                        <span className="deleted" onClick={(e) => { deleteAuthor(); e.preventDefault() }}>🗑️</span>
                    </div>


                    <button className="btn green darken-3" onClick={addAuthor}>
                        <i class="material-icons left">add_circle_outline</i>
                        Añadir más autores
                    </button>
                    <div>
                        <input type="submit" id="send" className="btn" value="Aceptar" />
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Formulario;