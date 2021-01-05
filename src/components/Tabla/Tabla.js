import React, { Fragment, useEffect, useState } from "react";
import "./Tabla.css";
import M from "materialize-css";
import {
  writeOnTable,
  downloadObjectAsJson,
  tabsFunction,
} from "../../js/Table/index";
import { searchOnTableAuthors } from "../../js/Table/author";
import { searchOnTablePublications } from "../../js/Table/publications";

const Tabla = (props) => {
  //props
  const { setShow, result } = props;

  const [
    entradasPorPaginaPublicaciones,
    setentradasPorPaginaPublicaciones,
  ] = useState(5);
  const [entradasPorPaginaAutores, setentradasPorPaginaAutores] = useState(2);

  //paginacion
  const [paginaActualPublicaciones, setpaginaActualPublicaciones] = useState(1);
  const [paginaActualAutores, setpaginaActualAutores] = useState(1);

  const [totalPaginasPublicaciones, setTotalPaginasPublicaciones] = useState(1);
  const [totalPaginasAuthors, setTotalPaginasAuthors] = useState(1);

  useEffect(() => {
    console.log(result);
    setTotalPaginasPublicaciones(
      Math.ceil(result.publications.length / entradasPorPaginaPublicaciones)
    );
    setTotalPaginasAuthors(
      Math.ceil(result.authors.length / entradasPorPaginaAutores)
    );
    writeOnTable(
      result,
      paginaActualAutores,
      entradasPorPaginaAutores,
      paginaActualPublicaciones,
      entradasPorPaginaPublicaciones
    );
    //inicializacion para los filtros
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {
      alignment: "right",
      hover: true,
      coverTrigger: false,
    });
  }, [
    result,
    entradasPorPaginaAutores,
    entradasPorPaginaPublicaciones,
    paginaActualAutores,
    paginaActualPublicaciones,
  ]);

  const previousPage = (type) => {
    let nuevaPaginaActual;
    if (type === "publications") {
      nuevaPaginaActual = paginaActualPublicaciones - 1;
      if (nuevaPaginaActual < 1) return;
      else {
        writeOnTable(
          result,
          paginaActualAutores,
          entradasPorPaginaAutores,
          nuevaPaginaActual,
          entradasPorPaginaPublicaciones
        );
        setpaginaActualPublicaciones(nuevaPaginaActual);
      }
    } else {
      nuevaPaginaActual = paginaActualAutores - 1;
      if (nuevaPaginaActual < 1) return;
      else {
        writeOnTable(
          result,
          nuevaPaginaActual,
          entradasPorPaginaAutores,
          paginaActualPublicaciones,
          entradasPorPaginaPublicaciones
        );
        setpaginaActualAutores(nuevaPaginaActual);
      }
    }
  };

  const nextPage = (type) => {
    let nuevaPaginaActual;
    if (type === "publications") {
      nuevaPaginaActual = paginaActualPublicaciones + 1;
      if (nuevaPaginaActual > totalPaginasPublicaciones) return;
      else {
        writeOnTable(
          result,
          paginaActualAutores,
          entradasPorPaginaAutores,
          nuevaPaginaActual,
          entradasPorPaginaPublicaciones
        );
        setpaginaActualPublicaciones(nuevaPaginaActual);
      }
    } else {
      nuevaPaginaActual = paginaActualAutores + 1;
      if (nuevaPaginaActual > totalPaginasAuthors) return;
      else {
        writeOnTable(
          result,
          nuevaPaginaActual,
          entradasPorPaginaAutores,
          paginaActualPublicaciones,
          entradasPorPaginaPublicaciones
        );
        setpaginaActualPublicaciones(nuevaPaginaActual);
      }
    }
  };

  const entries = (type) => {
    let nEntries;
    if (type === "Authors") {
      nEntries = parseInt(document.getElementById("entriesAuthors").value);
      writeOnTable(
        result,
        paginaActualAutores,
        nEntries,
        paginaActualPublicaciones,
        entradasPorPaginaPublicaciones
      );
      setentradasPorPaginaAutores(nEntries);
      setTotalPaginasAuthors(Math.ceil(result.authors.length / nEntries));
    } else {
      nEntries = parseInt(document.getElementById("entriesPublications").value);
      writeOnTable(
        result,
        paginaActualAutores,
        entradasPorPaginaAutores,
        paginaActualPublicaciones,
        nEntries
      );
      setentradasPorPaginaPublicaciones(nEntries);
      setTotalPaginasPublicaciones(
        Math.ceil(result.publications.length / nEntries)
      );
    }
  };

  const back = () => {
    window.location.reload();
    return false;
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 non-padding">
          <ul className="tabs">
            <li
              className="tab col s6"
              onClick={() => tabsFunction("tabAuthor")}
            >
              <a className="tablinks" href="#!">
                Authors
              </a>
            </li>
            <li
              className="tab col s6"
              onClick={() => tabsFunction("tabPublications")}
            >
              <a className="tablinks" href="#!">
                Publications
              </a>
            </li>
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
                  <input
                    type="number"
                    size="2"
                    min="1"
                    defaultValue={entradasPorPaginaAutores}
                    onChange={() => entries("Authors")}
                    id="entriesAuthors"
                  />
                </div>
              </div>

              <div className="search">
                <input
                  type="search"
                  id="myInputAuthors"
                  className="search-input"
                  placeholder="Search..."
                  onKeyUp={() => searchOnTableAuthors(result)}
                />
              </div>
            </div>

            <table className="datatable" id="tableAuthors">
              <thead>
                <tr>
                  <th>
                    {" "}
                    <i className="material-icons">import_export </i> Name
                  </th>
                  <th>
                    {" "}
                    <i className="material-icons">import_export </i>Indices
                  </th>
                  <th>
                    <i className="material-icons">import_export </i>Citas
                  </th>
                  <th>
                    <i className="material-icons">import_export </i>Jcr
                  </th>
                  <th>
                    <i className="material-icons">import_export </i>Ggs
                  </th>
                  <th>
                    <i className="material-icons">import_export </i>Core
                  </th>
                </tr>
              </thead>

              <tbody id="dataTableAuthors"></tbody>
            </table>

            <div class="footer-tools">
              <div className="pages">
                <ul>
                  <span>
                    page {paginaActualAutores} of {totalPaginasAuthors}
                  </span>
                  <li>
                    <button onClick={() => previousPage("authors")}>
                      previous
                    </button>
                  </li>
                  <li>
                    <button onClick={() => nextPage("authors")}>next</button>
                  </li>
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
                  <input
                    type="number"
                    size="2"
                    min="1"
                    defaultValue={entradasPorPaginaPublicaciones}
                    onChange={() => entries("Publications")}
                    id="entriesPublications"
                  />
                </div>
              </div>

              <div class="utilities">
                <div className="filter">
                  <a
                    className="dropdown-trigger btn"
                    href="#!"
                    data-target="dropdown1"
                  >
                    Filtros
                  </a>
                  <ul id="dropdown1" class="dropdown-content">
                    <li>
                      <a href="#!">
                        <i className="material-icons">assignment</i>Tipo
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="material-icons">today</i>Año
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="material-icons">event</i>Año de GSS
                      </a>
                    </li>
                    <li className="divider" tabIndex="-1"></li>
                    <li>
                      <a href="#!">
                        <i className="material-icons">exposure</i> Rango de años
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="material-icons">cloud</i>five
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="search">
                  <input
                    type="search"
                    id="myInputPublications"
                    className="search-input"
                    placeholder="Search..."
                    onKeyUp={() => searchOnTablePublications(result)}
                  />
                </div>
              </div>
            </div>

            <table className="datatable" id="tablePublications">
              <thead>
                <tr>
                  <th>
                    <i class="material-icons">import_export </i>Type
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Authors
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Tittle
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Pages
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Year
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Volumen
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Issue
                  </th>
                  <th id="j_b">
                    <i class="material-icons">import_export </i>Book_tittle for
                    inprocedings / Journal for articles{" "}
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>acronym
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Core
                  </th>
                  <th>
                    <i class="material-icons">import_export </i>Ggs
                  </th>
                </tr>
              </thead>

              <tbody id="dataTablePublications"></tbody>
            </table>

            <div className="footer-tools">
              <div className="pages">
                <ul>
                  <span>
                    page {paginaActualPublicaciones} of{" "}
                    {totalPaginasPublicaciones}
                  </span>
                  <li>
                    <button onClick={() => previousPage("publications")}>
                      previous
                    </button>
                  </li>
                  <li>
                    <button onClick={() => nextPage("publications")}>
                      next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <a
            className="btn blue-grey darken-2"
            href="#!"
            id="downloadJson"
            onClick={() => downloadObjectAsJson(result, "Resultado")}
          >
            <i className="material-icons right">file_download</i>
            Download JSON
          </a>
          <a
            className="btn blue-grey darken-2"
            id="back"
            href="#!"
            onClick={() => back()}
          >
            <i className="material-icons right">reply</i>volver
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Tabla;
