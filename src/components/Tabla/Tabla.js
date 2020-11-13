import React, { Fragment, useEffect, useState } from 'react'
import './Tabla.css'
import { downloadObjectAsJson, writeOnTable, searchOnTableAuthors,searchOnTablePublications, tabsFunction } from '../../js/utils'

const Tabla = (props) => {
    //props
    const { setShow, result } = props;

    const [entradasPorPaginaPublicaciones, setentradasPorPaginaPublicaciones] = useState(2);
    const [entradasPorPaginaAutores, setentradasPorPaginaAutores] = useState(2);

    //paginacion
    const [paginaActualPublicaciones, setpaginaActualPublicaciones] = useState(1);
    const [paginaActualAutores, setpaginaActualAutores] = useState(1);

    const [totalPaginasPublicaciones, setTotalPaginasPublicaciones] = useState(1);
    const [totalPaginasAuthors, setTotalPaginasAuthors] = useState(1);

    useEffect(() => {
        setTotalPaginasPublicaciones(Math.ceil(result.publications.length / entradasPorPaginaPublicaciones));
        setTotalPaginasAuthors(Math.ceil(result.authors.length / entradasPorPaginaAutores));
        writeOnTable(result, paginaActualAutores, entradasPorPaginaAutores,paginaActualPublicaciones,entradasPorPaginaPublicaciones);
    }, [result])

    const previousPage = (type) => {
        if(type === "publications"){
            var nuevaPaginaActual = paginaActualPublicaciones - 1;
            if (nuevaPaginaActual < 1)
                return;
            else {
                writeOnTable(result, paginaActualAutores, entradasPorPaginaAutores,nuevaPaginaActual,entradasPorPaginaPublicaciones);
                setpaginaActualPublicaciones(nuevaPaginaActual);
            }
        }else{
            var nuevaPaginaActual = paginaActualAutores - 1;
            if (nuevaPaginaActual < 1)
                return;
            else {
                writeOnTable(result, nuevaPaginaActual, entradasPorPaginaAutores,paginaActualPublicaciones,entradasPorPaginaPublicaciones);
                setpaginaActualPublicaciones(nuevaPaginaActual);
            }
        }
    }

    const nextPage = (type) => {
        if(type === "publications"){
            var nuevaPaginaActual = paginaActualPublicaciones + 1;
            if (nuevaPaginaActual > totalPaginasPublicaciones)
                return;
            else {
                writeOnTable(result, paginaActualAutores, entradasPorPaginaAutores,nuevaPaginaActual,entradasPorPaginaPublicaciones);
                setpaginaActualPublicaciones(nuevaPaginaActual);
            }
        }else{
            var nuevaPaginaActual = paginaActualAutores + 1;
            if (nuevaPaginaActual > totalPaginasAuthors)
                return;
            else {
                writeOnTable(result, nuevaPaginaActual, entradasPorPaginaAutores,paginaActualPublicaciones,entradasPorPaginaPublicaciones);
                setpaginaActualPublicaciones(nuevaPaginaActual);
            }
        }
    }

    const entries = (type) => {
        if(type === "Authors"){
            var nEntries = parseInt(document.getElementById("entriesAuthors").value);
            writeOnTable(result, paginaActualAutores, nEntries,paginaActualPublicaciones,entradasPorPaginaPublicaciones);
            setentradasPorPaginaAutores(nEntries);
            setTotalPaginasAuthors(Math.ceil(result.authors.length / nEntries));
        }else{
            var nEntries = parseInt(document.getElementById("entriesPublications").value);
            writeOnTable(result, paginaActualAutores, entradasPorPaginaAutores,paginaActualPublicaciones,nEntries);
            setentradasPorPaginaPublicaciones(nEntries);
            setTotalPaginasPublicaciones(Math.ceil(result.publications.length / nEntries));
        }
    }

    const back = () => {
        setShow(true);
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col s12 non-padding">
                    <ul className="tabs">
                        <li className="tab col s6" onClick={() => tabsFunction("tabAuthor")}><a className="tablinks">Authors</a></li>
                        <li className="tab col s6" onClick={() => tabsFunction("tabPublications")}><a className="tablinks">Publications</a></li>
                    </ul>
                </div>
            </div>


            <div className="row tabContent" id="tabAuthor">

                <div className="col s12">
                    <h3 className="white-text">Autores</h3>
                    <div className="datatable-container">
                        <div className="header-tools">
                            <div className="tools">
                                <div className="n_entries">
                                    <label htmlFor="entries">Number of entries:</label>
                                    <input type="number" size="2" min="1" defaultValue={entradasPorPaginaAutores} onChange={() => entries("Authors")} id="entriesAuthors" />
                                </div>
                            </div>

                            <div className="search">
                                <input type="search" id="myInputAuthors" class="search-input" placeholder="Search..." onKeyUp={() => searchOnTableAuthors(result)} />
                            </div>
                        </div>

                        <table className="datatable responsive-table" id="tableAuthors" >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Indices</th>
                                    <th>Citas</th>
                                    <th>Jcr</th>
                                    <th>Ggs</th>
                                    <th>Core</th>
                                </tr>
                            </thead>

                            <tbody id="dataTableAuthors"></tbody>
                        </table>

                        <div class="footer-tools">
                            <div className="list-items">
                                <select name="n-entries" id="n-entries" class="n-entries">
                                    <option value="5">5</option>
                                    <option value="10" selected>10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>

                            <div className="pages">
                                <ul>
                                    <li><span className="active">1</span></li>
                                    <li><button>2</button></li>
                                    <li><button>3</button></li>
                                    <li><button>4</button></li>
                                    <li><span>...</span></li>
                                    <li><button>9</button></li>
                                    <li><button>10</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row tabContent non-display" id="tabPublications">

                <div className="col s12">
                    <h3 className="white-text">Publications</h3>
                    <div className="datatable-container">
                        <div className="header-tools">
                            <div className="tools">
                                <div className="n_entries">
                                    <label htmlFor="entries">Number of entries:</label>
                                    <input type="number" size="2" min="1" defaultValue={entradasPorPaginaPublicaciones} onChange={() => entries("Publications")} id="entriesPublications" />
                                </div>
                            </div>

                            <div class="search">
                                <input type="search" id="myInputPublications" class="search-input" placeholder="Search..." onKeyUp={() => searchOnTablePublications(result)} />
                            </div>
                        </div>

                        <table className="datatable responsive-table" id="tablePublications" >
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Authors</th>
                                    <th>Tittle</th>
                                    <th>Pages</th>
                                    <th>Year</th>
                                    <th>Volumen</th>
                                    <th>Issue</th>
                                    <th id="j_b">Book_tittle / Journal</th>
                                    <th>acronym</th>
                                    <th>Core</th>
                                    <th>Ggs</th>

                                </tr>
                            </thead>

                            <tbody id="dataTablePublications"></tbody>
                        </table>

                        <div className="footer-tools">

                            <div className="pages">
                                <ul>
                                    <span>page {paginaActualPublicaciones} of {totalPaginasPublicaciones}</span>
                                    <li><button onClick={() => previousPage("publications")}>previous</button></li>
                                    <li><button onClick={() => nextPage("publications")}>next</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col s12">
                    <a className="btn blue-grey darken-2" href="#" id="downloadJson" onClick={() => downloadObjectAsJson(result, "Resultado")}>
                        <i className="material-icons right">
                            file_download
                            </i>
                            Download JSON
                        </a>
                    <a className="btn blue-grey darken-2" id="back" href="#" onClick={()=> back()}><i className="material-icons right">reply</i>volver</a>
                </div>

            </div>
        </Fragment >
    )
}

export default Tabla
