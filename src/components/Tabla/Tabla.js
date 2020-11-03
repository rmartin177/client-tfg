import React, { Fragment, useEffect, useState } from 'react'
import './Tabla.css'
import { downloadObjectAsJson, writeAuthorOnTable, searchOnTable, tabsFunction } from '../../js/utils'

const Tabla = (props) => {
    //props
    const { setShow, result } = props;

    const entradasPorPagina = 2;
    //paginacion
    const [paginaActual, setpaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        setTotalPaginas(Math.ceil(result.publications.length / entradasPorPagina));
        writeAuthorOnTable(result, paginaActual, entradasPorPagina);
    }, [result])

    const previousPage = () => {
        var nuevaPaginaActual = paginaActual - 1;
        if (nuevaPaginaActual < 1)
            return;
        else {
            writeAuthorOnTable(result, nuevaPaginaActual, entradasPorPagina);
            setpaginaActual(nuevaPaginaActual);
        }
    }

    const nextPage = () => {
        var nuevaPaginaActual = paginaActual + 1;
        if (nuevaPaginaActual > totalPaginas)
            return;
        else {
            writeAuthorOnTable(result, nuevaPaginaActual, entradasPorPagina);
            setpaginaActual(nuevaPaginaActual);
        }
    }

    const entries = () => {
        console.log("entro")
        var nEntries = document.getElementById("entries").value;
        writeAuthorOnTable(result, paginaActual, nEntries);
    }

    const back = () => {
        setShow(true);
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s6" onClick={() => tabsFunction("tabAuthor")}><a className="tablinks">Authors</a></li>
                        <li className="tab col s6" onClick={() => tabsFunction("tabPublications")}><a className="tablinks">Publications</a></li>
                    </ul>
                </div>
            </div>


            <div className="row tabContent" id="tabAuthor">

                <div className="col s12">
                    <h3>Autores</h3>
                    <div className="datatable-container">
                        <div className="header-tools">
                            <div className="tools">
                                <ul>
                                    <li>
                                        <button>
                                            <i className="material-icons">add_circle</i>
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="material-icons">edit</i>
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i className="material-icons">delete</i>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="search">
                                <input type="search" className="search-input" placeholder="Search..." />
                            </div>
                        </div>

                        <table className="datatable" >
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Authors</th>
                                    <th>Tittle</th>
                                    <th>Pages</th>
                                    <th>Year</th>
                                    <th>Volumen</th>
                                    <th>Issue</th>
                                    <th>Book_tittle</th>
                                    <th>Quotes</th>
                                    <th>Core</th>
                                    <th>Ggs</th>

                                </tr>
                            </thead>

                            <tbody id="dataTableAuthor">
                                <tr>
                                    <td>Publicacion</td>
                                    <td>John</td>
                                    <td>Smith</td>
                                    <td>Product Owner</td>
                                    <td>john.smith@codepen.io</td>
                                    <td>JohnSmith</td>
                                    <td>Spain</td>
                                    <td>January 21, 1984</td>
                                    <td>January 21, 1984</td>
                                    <td>January 21, 1984</td>
                                    <td>January 21, 1984</td>
                                </tr>

                            </tbody>
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
                    <h3>Publications</h3>
                    <div className="datatable-container">
                        <div className="header-tools">
                            <div className="tools">
                                <div className="n_entries">
                                    <label htmlFor="entries">Number of entries:</label>
                                    <input type="number" size="2" min="1" defaultValue={entradasPorPagina} onKeyUp={() => entries()} id="entries" />
                                </div>
                            </div>

                            <div class="search">
                                <input type="search" id="myInputPublications" class="search-input" placeholder="Search..." onKeyUp={() => searchOnTable()} />
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
                                    <th>Book_tittle</th>
                                    <th>Quotes</th>
                                    <th>Core</th>
                                    <th>Ggs</th>

                                </tr>
                            </thead>

                            <tbody id="dataTablePublications"></tbody>
                        </table>

                        <div className="footer-tools">

                            <div className="pages">
                                <ul>
                                    <span>page {paginaActual} of {totalPaginas}</span>
                                    <li><button onClick={previousPage}>previous</button></li>
                                    <li><button onClick={nextPage}>next</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col s12">
                    <a className="btn" href="#" id="downloadJson" onClick={() => downloadObjectAsJson(result, "Resultado")}>
                        <i className="material-icons right">
                            file_download
                            </i>
                            Download JSON
                        </a>
                    <a className="btn" href="#" onClick={back}><i className="material-icons right">reply</i>volver</a>
                </div>

            </div>
        </Fragment >
    )
}

export default Tabla
