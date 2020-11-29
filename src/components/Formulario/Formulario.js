import React, { Fragment, useState, useEffect } from 'react'
import "./Formulario.css"
import { deleteAuthor, addAuthor } from '../../js/Table/author'
import axios from "../../config/axios"
import M from "materialize-css"
import Spinner from '../Spinner/Spinner'

const Formulario = (props) => {
    const { setShow, setresult, setShowModal, setauthorsModal, authorsChoosen } = props;
    const [showSpinner, setSpinner] = useState(false);

    useEffect(() => {
        if (authorsChoosen.length !== 0) {
            console.log(authorsChoosen);
            const sanitize = async () => {
                if (await getJsonSanitize(authorsChoosen)) {
                    //cuando este todo ok damos paso a la siguiente pantalla y quitamos el spinner
                    setSpinner(false);
                    setShow(false);
                }
            }
            sanitize();
        }
    }, [authorsChoosen])
    //objeto para comprobar si los autores se tienen homonimo
    var AuthorsApi;
    //Array con los nombre de los autores del formulario
    const autores = [];
    //Funcion que se ejecuta cuando se pulsa el submit
    const saveAuthors = async (e) => {
        e.preventDefault();
        //se recorre el array y se comprueba que no son vacios antes de hacer la peticion
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
            //hacemos la llamada para ver si ningún autor tiene un homonimo
            //Activamos el spinner mientras carga la petición
            setSpinner(true);
            if (await getJson(autores)) {
                //Comprobamos todos los homonimos y nos quedamos con ellos para enviarselo al modal
                let choose = false;
                //Hay algun homonimo 
                if (AuthorsApi.publications === undefined) {
                    AuthorsApi.forEach((elm) => {
                        if (elm.authors.length > 1) {
                            let obj = {};
                            for (let index = 0; index < elm.authors.length; index++) {
                                obj[index] = elm.authors[index];
                            }
                            setauthorsModal(obj);
                            choose = true;
                        }
                    });
                }

                //si existe algún homonimo llamamos al modal y este se encargara de mandarnos los autores elegidos para hacer la segunda peticion en el use Effect
                if (choose)
                    setShowModal(true);
                else {
                    //cuando este todo ok damos paso a la siguiente pantalla y quitamos el spinner
                    setSpinner(false);
                    setShow(false);
                }

            }
        }
    };



    async function getJson(authors) {
        try {
            //RESULT LO CONVIERTES A JSON Y LO MUESTRAS EN TABLAS Y LO PERMITES DESCARGAR
            //conversion a Json y lo insertamos en el state para que la tabla pueda acceder a la info
            AuthorsApi = (await axios.post("/api/getjson", authors)).data;
            setresult(AuthorsApi);
            return true;

        } catch (error) {
            return false;
        }
    }

    async function getJsonSanitize(authors) {
        console.log("Tratando de encontrar los autores,va bien...");
        try {
            //RESULT LO CONVIERTES A JSON Y LO MUESTRAS EN TABLAS Y LO PERMITES DESCARGAR
            //conversion a Json y lo insertamos en el state para que la tabla pueda acceder a la info
            AuthorsApi = (await axios.post("/api/getjsonsanitize", /*{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
                , */authors)).data;
            setresult(AuthorsApi);
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }

    }


    return (
        <Fragment>
            <h1 id="title">
                TFG
            </h1>
            {
                showSpinner
                    ?
                    <div className="contenedor-principal">
                        <div className="white-text">
                            We are working on it, please wait...
                                </div>
                        <Spinner />
                    </div>


                    :
                    <div className="contenedor-principal" id="contenedorModal">
                        <form onSubmit={(e) => saveAuthors(e)}
                            className="col s12">

                            <div className="input-field col s12">
                                <label htmlFor="author1" className="white-text">Author Name:</label>
                                <input type="text" className="writeAuthor validate white-text" name="author1" />
                                <span className="deleted" role="img" aria-label="bin" onClick={(e) => { deleteAuthor(); e.preventDefault() }}>
                                    🗑️
                                </span>
                            </div>


                            <button type="button" id="addAuthor" className="btn black-text grey lighten-1" onClick={(e) => addAuthor(e)}>
                                <i className="material-icons left">add_circle_outline</i>
                                Add author
                            </button>

                            <div>
                                <button type="submit" id="send" className="btn waves-effect waves-light">
                                    <i className="material-icons right">send</i>
                                    send
                                </button>
                            </div>
                        </form>

                    </div>
            }
        </Fragment>
    )
}

export default Formulario;