import React, { Fragment, useState } from 'react'
import "./Formulario.css"
import { deleteAuthor } from '../../js/utils'
import M from "materialize-css"


const Formulario = () => {

    //Array con los nombre de los autores
    const autores = [];

    //Funcion que se ejecuta cuando se escribe en algun input
    const guardarAutores = (e) => {
        e.preventDefault();

        var nAutores = document.querySelectorAll("form .writeAuthor");
        nAutores.forEach((nombre) => {
            if (nombre.value !== "")
                autores.push(nombre.value);
        });

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
                        <label for="author1">Nombre del autor:</label>
                        <input type="text" className="writeAuthor validate" name="author1" />
                        <span className="deleted" onClick={(e) => { deleteAuthor(); e.preventDefault() }}>🗑️</span>
                    </div>


                    <button className="btn" onClick={addAuthor}>
                        Añadir más autores
                    </button>
                    <div>
                        <input type="submit" id="send" className="btn" value="Aceptar" />
                    </div>
                </form>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Alvin</td>
                            <td>Eclair</td>
                            <td>$0.87</td>
                        </tr>
                        <tr>
                            <td>Alan</td>
                            <td>Jellybean</td>
                            <td>$3.76</td>
                        </tr>
                        <tr>
                            <td>Jonathan</td>
                            <td>Lollipop</td>
                            <td>$7.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Formulario;