import React, { Fragment } from 'react'
import "./Formulario.css"
import Dark from '../DarkTheme/DarkTheme'
import {addAuthor,deleteAuthor} from '../../js/utils'

const Formulario = () => {

    return (
        <Fragment>
            <h1>
                Formulario
            </h1>

            <div id="contenedor-principal">
                <form>
                    <div>
                        <label className="white">Introduce el nombre del autor:</label>
                        <input type="text" className="writeAuthor" />
                        <span className="deleted" onClick={(e) =>{ deleteAuthor(); e.preventDefault() }}>🗑️</span>
                    </div>

                    <button id="addAuthor" onClick={(e) => { addAuthor(); e.preventDefault() }}>
                        Añadir más autores
                    </button>

                    <div>
                        <button type="submit">Aceptar</button>
                    </div>
                </form>
            </div>

        </Fragment>
    )
}

export default Formulario;