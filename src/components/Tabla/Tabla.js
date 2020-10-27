import React, { Fragment, useEffect, useState } from 'react'
import './Tabla.css'
import { downloadObjectAsJson, writeAuthorOnTable, searchOnTable} from '../../js/utils'

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

    const previousPage = () =>{
        var nuevaPaginaActual = paginaActual - 1;
        if(nuevaPaginaActual < 1)
            return;
        else{
            writeAuthorOnTable(result, nuevaPaginaActual, entradasPorPagina);
            setpaginaActual(nuevaPaginaActual);
        }
    }

    const nextPage = () =>{
        var nuevaPaginaActual = paginaActual + 1;
        if(nuevaPaginaActual > totalPaginas)
            return;
        else{
            writeAuthorOnTable(result, nuevaPaginaActual, entradasPorPagina);
            setpaginaActual(nuevaPaginaActual);
        }
    }

    const back = () => {
        setShow(true);
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col s2" id="tabAuthor">
                    <button className="tabs">Autores</button>
                </div>

                <div className="col s2" id="tabPublications">
                    <button className="tabs">Publicaciones</button>
                </div>
            </div>


            <div className="row">

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

                            <div class="search">
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
            <div className="row">

                <div className="col s12">
                    <h3>Publicaciones</h3>
                    <div className="datatable-container">
                        <div className="header-tools">
                            <div class="tools">
                                <ul>
                                    <li>
                                        <button>
                                            <i class="material-icons">add_circle</i>
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i class="material-icons">edit</i>
                                        </button>
                                    </li>
                                    <li>
                                        <button>
                                            <i class="material-icons">delete</i>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div class="search">
                                <input type="search"  id="myInputPublications" class="search-input" placeholder="Search..." onKeyUp={()=> searchOnTable()} />
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
                            <div className="list-items">
                                <select name="n-entries" id="n-entries" className="n-entries">
                                    <option value="5">5</option>
                                    <option value="10" selected>10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>

                            <div className="pages">
                                <ul>
                                    <span>página {paginaActual} de {totalPaginas}</span>
                                    <li><button onClick={previousPage}>Anterior</button></li>
                                    <li><button onClick={nextPage}>Siguiente</button></li>
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
                            Descargar JSON
                        </a>
                    <a className="btn" href="#" onClick={back}><i className="material-icons right">reply</i>volver</a>
                </div>

            </div>
        </Fragment >
    )
}

export default Tabla
