import React, { Fragment } from 'react'
import './Tabla.css'

const Tabla = (props) => {

    const { setmostrar } = props;

    const back = () => {
        setmostrar(true);
    }
    return (
        <Fragment>

            <div className="row">

                <div className="col s12">
                    <h3>Autores</h3>
                    <table className="customTable">
                        <thead>
                            {/* Cabeceras */}
                            <tr>
                                <th>Name</th>
                                <th>Indices</th>
                                <th>Citas</th>
                                <th>Jcr</th>
                                <th>Ggs</th>
                                <th>Core</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* nombre */}
                                <td>Miguel Bose</td>
                                {/* indices */}
                                <td>
                                    <ul>
                                        <li>indice_h_total_google_scholar: 126</li>
                                        <li>indice_h_5_años_google_scholar: 126</li>
                                        <li>indice_i10_total_google_scholar: 126</li>
                                        <li>indice_i10_5_años_google_scholar: 126</li>
                                        <li>indice_h_total_scopus: 126</li>
                                    </ul>
                                   
                                </td>
                                <td>
                                    <ul>
                                        <li>citas_total_google_scholar: 9000 </li>
                                        <li>citas_total_5_años_google_scholar: 9000</li>
                                        <li>citas_total_scopus: 9000</li>
                                    </ul>
                                </td>
                                {/* jcr */}
                                <td>
                                    <ul>
                                        <li>numero_publicaciones_q1: 3</li>
                                        <li>numero_publicaciones_q2": 4</li>
                                        <li>numero_publicaciones_q3": 5</li>
                                        <li>numero_publicaciones_q4": 1</li>
                                    </ul>
                                </td>

                                {/* ggs */}
                                <td>
                                    <ul>
                                        <li>numero_publicaciones_class_1: 3</li>
                                        <li>numero_publicaciones_class_2: 3</li>
                                        <li>numero_publicaciones_class_3: 3</li>
                                      
                                    </ul>
                                   
                                </td>
                                {/* core */}
                                <td>    
                                    <ul>
                                        <li>numero_publicaciones_A*: 3</li>
                                        <li>numero_publicaciones_B: 3</li>  
                                        <li>numero_publicaciones_C: 3</li>
                                    </ul>      
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className="row">

                    <div className="col s12">
                        <h3>Publicaciones</h3>
                        <table className="customTable">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Authors</th>
                                    <th>Title</th>
                                    <th>Pages</th>
                                    <th>Year</th>
                                    <th>Volume</th>
                                    <th>Issue</th>
                                    <th>Journal</th>
                                    <th>Citas</th>
                                    <th>Core</th>
                                    <th>Ggs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Row 1, Cell 1</td>
                                    <td>Row 1, Cell 2</td>
                                    <td>Row 1, Cell 3</td>
                                    <td>Row 1, Cell 4</td>
                                    <td>Row 1, Cell 5</td>
                                    <td>Row 1, Cell 6</td>
                                </tr>
                                <tr>
                                    <td>Row 2, Cell 1</td>
                                    <td>Row 2, Cell 2</td>
                                    <td>Row 2, Cell 3</td>
                                    <td>Row 2, Cell 4</td>
                                    <td>Row 2, Cell 5</td>
                                    <td>Row 2, Cell 6</td>
                                </tr>
                                <tr>
                                    <td>Row 3, Cell 1</td>
                                    <td>Row 3, Cell 2</td>
                                    <td>Row 3, Cell 3</td>
                                    <td>Row 3, Cell 4</td>
                                    <td>Row 3, Cell 5</td>
                                    <td>Row 3, Cell 6</td>
                                </tr>
                                <tr>
                                    <td>Row 4, Cell 1</td>
                                    <td>Row 4, Cell 2</td>
                                    <td>Row 4, Cell 3</td>
                                    <td>Row 4, Cell 4</td>
                                    <td>Row 4, Cell 5</td>
                                    <td>Row 4, Cell 6</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <a className="btn" href="Autores.json.txt" target="_blank" download><i class="material-icons right">file_download</i>Descargar JSON</a>
                        <a className="btn" onClick={back}><i class="material-icons right">reply</i>volver</a>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Tabla
