import React, { Fragment, useEffect, useState } from "react";
import "./Tabla.css";
import M from "materialize-css";
import {
  writeOnTable,
  downloadObjectAsJson,
  tabsFunction,
} from "../../js/Table/index";
import { clearFilterInfo } from "../../js/utils";
import { searchOnTableAuthors } from "../../js/Table/author";
import { searchOnTablePublications } from "../../js/Table/publications";

const Tabla = (props) => {
  //props
  const { setShow, result, filtersAuthors } = props;

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
      entradasPorPaginaPublicaciones,
      filtersAuthors
    );
    clearFilterInfo(filtersAuthors);

    //iniciamos los chips
    var elems = document.querySelectorAll(".chips");
    var instances = M.Chips.init(elems);
    //llamamos a la funcion que nos da información sobre los filtros
    // clearFilterInfo(filtersAuthors);
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
          entradasPorPaginaPublicaciones,
          filtersAuthors
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
          entradasPorPaginaPublicaciones,
          filtersAuthors
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
          entradasPorPaginaPublicaciones,
          filtersAuthors
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
          entradasPorPaginaPublicaciones,
          filtersAuthors
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
        entradasPorPaginaPublicaciones,
        filtersAuthors
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
        nEntries,
        filtersAuthors
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
      <div className="row pd">
        <div className="col s12 non-padding">
          <ul className="tabs">
            <li
              className="tab col s4"
              onClick={() => tabsFunction("tabAuthor")}
            >
              <a className="tablinks" href="#!">
                Authors
              </a>
            </li>
            <li
              className="tab col s4"
              onClick={() => {
                tabsFunction("tabPublications"); //llamamos a la funcion que nos da información sobre los filtros
                clearFilterInfo(filtersAuthors);
              }}
            >
              <a className="tablinks" href="#!">
                Publications
              </a>
            </li>
            <li
              className={`tab col s4 ${result.errors.length === 0 ? "correct" : "no-correct"}`}
              onClick={() => {
                tabsFunction("tabErrors"); //llamamos a la funcion que nos da información sobre los filtros
              }}
            >
              <a className="tablinks" href="#!">
                Errors
              </a>
            </li>
          </ul>
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
            <i className="material-icons right">reply</i>Back
          </a>
        </div>
      </div>
      <div className="row tabContent" id="tabAuthor">
        <div className="col s12">
          <h6 className="white-text">Autores</h6>
          <div className="datatable-container">
            <div className="header-tools">
              <div className="tools">
                <div className="n_entries">
                  <label htmlFor="entries">Number of entries:</label>
                  <input
                    type="number"
                    size="3"
                    min="1"
                    defaultValue={entradasPorPaginaAutores}
                    onChange={() => entries("Authors")}
                    id="entriesAuthors"
                  />
                </div>
              </div>

              <div className="filtersInfo">
                <p>
                  <label className="checkArticles">
                    <input type="checkbox" checked="checked" />
                    <span>Articles</span>
                  </label>
                </p>

                <p>
                  <label className="checkInproceedings">
                    <input type="checkbox" checked="checked" />
                    <span>Inproceedings</span>
                  </label>
                </p>

                <p>
                  <label className="checkIncollections">
                    <input type="checkbox" checked="checked" />
                    <span>Incollections</span>
                  </label>
                </p>

                <p>
                  <label className="checkCore">
                    <input type="checkbox" checked="checked" />
                    <span>Core</span>
                  </label>
                </p>

                <p>
                  <label className="checkGGS">
                    <input type="checkbox" checked="checked" />
                    <span>GGS</span>
                  </label>
                </p>

                <p>
                  <label className="checkJRC">
                    <input type="checkbox" checked="checked" />
                    <span>JCR</span>
                  </label>
                </p>

                <p>
                  <label className="checkSchoolar">
                    <input type="checkbox" checked="checked" />
                    <span>Scholar</span>
                  </label>
                </p>

                <p>
                  <label className="checkScopus">
                    <input type="checkbox" checked="checked" />
                    <span>Scopus</span>
                  </label>
                </p>
                <div className="chip initYear">
                  <span className="initYear">No data</span>
                </div>
                <div className="chip endYear">
                  <span className="endYear">No data</span>
                </div>
              </div>

              <div className="search">
                <input
                  type="search"
                  id="myInputAuthors"
                  className="search-input"
                  placeholder="Search..."
                  onKeyUp={() => searchOnTableAuthors(result,filtersAuthors)}
                />
              </div>
            </div>

            <table className="datatable" id="tableAuthors">
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
          <h6 className="white-text">Publications</h6>
          <div className="datatable-container">
            <div className="header-tools">
              <div className="tools">
                <div className="n_entries">
                  <label htmlFor="entries">Number of entries:</label>
                  <input
                    type="number"
                    size="3"
                    min="1"
                    defaultValue={entradasPorPaginaPublicaciones}
                    onChange={() => entries("Publications")}
                    id="entriesPublications"
                  />
                </div>
              </div>

              <div className="filtersInfo">
                <p>
                  <label className="checkArticles">
                    <input type="checkbox" checked="checked" />
                    <span>Articles</span>
                  </label>
                </p>

                <p>
                  <label className="checkInproceedings">
                    <input type="checkbox" checked="checked" />
                    <span>Inproceedings</span>
                  </label>
                </p>

                <p>
                  <label className="checkIncollections">
                    <input type="checkbox" checked="checked" />
                    <span>Incollections</span>
                  </label>
                </p>

                <p>
                  <label className="checkCore">
                    <input type="checkbox" checked="checked" />
                    <span>Core</span>
                  </label>
                </p>

                <p>
                  <label className="checkGGS">
                    <input type="checkbox" checked="checked" />
                    <span>GGS</span>
                  </label>
                </p>

                <p>
                  <label className="checkJRC">
                    <input type="checkbox" checked="checked" />
                    <span>JCR</span>
                  </label>
                </p>

                <p>
                  <label className="checkSchoolar">
                    <input type="checkbox" checked="checked" />
                    <span>Scholar</span>
                  </label>
                </p>

                <p>
                  <label className="checkScopus">
                    <input type="checkbox" checked="checked" />
                    <span>Scopus</span>
                  </label>
                </p>
                <div className="chip initYear">
                  <span className="initYear">No data</span>
                </div>
                <div className="chip endYear">
                  <span className="endYear">No data</span>
                </div>
              </div>

              <div class="search">
                <input
                  type="search"
                  id="myInputPublications"
                  className="search-input"
                  placeholder="Search..."
                  onKeyUp={() => searchOnTablePublications(result,filtersAuthors)}
                />
              </div>
            </div>

            <table className="datatable" id="tablePublications">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Authors</th>
                  <th>Title</th>
                  <th>Pages</th>
                  <th>Year</th>
                  <th>Volumen</th>
                  <th>Issue</th>
                  <th id="j_b">
                    Book_title for inprocedings / Journal for articles
                  </th>
                  <th>Acronym</th>
                  <th>Core</th>
                  <th>GGS</th>
                  <th>Citas</th>
                  <th>JCR</th>
                </tr>
              </thead>
              <tbody id="dataTablePublications">
              </tbody>

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
      <div className={`row tabContent non-display ${result.errors.length === 0 ? "correct" : "no-correct"}`} id="tabErrors">
      {result.errors.length === 0 ? 
      <>
        <ul>
          <li>The process has been completed without errors :D</li>
        </ul>
      </>
       : null}
      </div>
    </Fragment>
  );
};

export default Tabla;
