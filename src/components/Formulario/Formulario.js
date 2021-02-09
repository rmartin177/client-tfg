import React, { Fragment, useState, useEffect } from "react";
import "./Formulario.css";
import { deleteAuthor, addAuthor } from "../../js/Table/author";
import axios from "../../config/axios";
import M from "materialize-css";
import Spinner from "../Spinner/Spinner";

import Slider from "../Slider/slider";

const Formulario = (props) => {
  const {
    sanitize,
    setShow,
    setresult,
    setShowModal,
    setauthorsModal,
    authorsChoosen,
    setauthorsChoosen,
    showSpinner,
    setSpinner,
    setuserSearch,
  } = props;

  const [number, setnumber] = useState(2);
  const [startYearValue, setstartYearValue] = useState("1990");
  const [endYearValue, setendYearValue] = useState("2021");
  useEffect(() => {
    //si intenta hacer esta comprobacion es que hay algun homonimo
    //if (authorsChoosen.length === number - 1) {
    if (sanitize) {
      const call = async () => {
        if (await getJsonSanitize(authorsChoosen, filters)) {
          //cuando este todo ok damos paso a la siguiente pantalla y quitamos el spinner
          setSpinner(false);
          setShow(false);
        }
      };
      call();
    }
  }, [authorsChoosen, getJsonSanitize, setShow, setSpinner, sanitize]);
  //objeto para comprobar si los autores se tienen homonimo
  var AuthorsApi;
  var filters = {};
  //Array con los nombre de los autores del formulario y los filtros
  const autores = [];

  //Funcion que se ejecuta cuando se pulsa el submit
  const saveAuthors = async (e) => {
    e.preventDefault();
    //se recorre el array y se comprueba que no son vacios antes de hacer la peticion
    var nAutores = document.querySelectorAll("form .writeAuthor");
    nAutores.forEach((nombre) => {
      if (nombre.value !== "") autores.push(nombre.value);
    });

    //se comprueba que por lo menos haya un autor
    if (autores.length === 0) {
      var toastHTML =
        '<span class="errorEmpty">Write at least one author.</span>';
      M.toast({ html: toastHTML, classes: "rounded" });
    } else {
      //Rellenamos el state con lo que ha ecrito el usuario
      setuserSearch(autores);
      //hacemos la llamada para ver si ningún autor tiene un homonimo
      //Activamos el spinner mientras carga la petición
      if (checkFilters()) {
        setSpinner(true);
        if (await getJson(autores, filters)) {
          //Comprobamos todos los homonimos y nos quedamos con ellos para enviarselo al modal
          let choose = false;
          var ar = [];
          //Hay algun homonimo
          if (AuthorsApi.publications === undefined) {
            AuthorsApi.forEach((elm) => {
              if (elm.authors.length > 1) {
                let obj = {};
                for (let index = 0; index < elm.authors.length; index++) {
                  obj[index] = elm.authors[index];
                }
                ar.push(obj);
                choose = true;
              } else {
                setauthorsChoosen([
                  {
                    author: elm.authors[0].author,
                    link: elm.authors[0].link,
                  },
                ]);
                setnumber(number + 1);
              }
            });
          }

          setauthorsModal(ar);
          //si existe algún homonimo llamamos al modal y este se encargara de mandarnos los autores elegidos para hacer la segunda peticion en el use Effect
          if (choose) {
            setShowModal(true);
          } else {
            //cuando este todo ok damos paso a la siguiente pantalla y quitamos el spinner
            setSpinner(false);
            setShow(false);
          }
        }
      }
    }
  };

  async function getJson(authors, filters) {
    try {
      //RESULT LO CONVIERTES A JSON Y LO MUESTRAS EN TABLAS Y LO PERMITES DESCARGAR
      //conversion a Json y lo insertamos en el state para que la tabla pueda acceder a la info
      let aux = {
        authors,
        filters,
      };
      AuthorsApi = (await axios.post("/api/getjson", aux)).data;
      setresult(AuthorsApi);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function getJsonSanitize(authors, filters) {
    try {
      //RESULT LO CONVIERTES A JSON Y LO MUESTRAS EN TABLAS Y LO PERMITES DESCARGAR
      //conversion a Json y lo insertamos en el state para que la tabla pueda acceder a la info
      let aux = {
        authors,
        filters,
      };
      AuthorsApi = (
        await axios.post(
          "/api/getjsonsanitize",
          /*{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
                , */ aux
        )
      ).data;
      setresult(AuthorsApi);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const checkFilters = () => {
    let ok = false;
    var filterChecked = document.querySelectorAll("#filtersContainer input");
    console.log(filterChecked.length);
    if (filterChecked.length === 0) {
      var toastHTML =
        '<span class="errorEmpty">Choose at least one filter.</span>';
      M.toast({ html: toastHTML, classes: "rounded" });
    } else {
      //hay que formar el objeto que mando a ruben
      for (let index = 0; index < filterChecked.length; index++) {
        if (filterChecked[index].classList.contains("checked"))
          filters[filterChecked[index].value] = true;
        else filters[filterChecked[index].value] = false;
      }
      filters["initYear"] = startYearValue;
      filters["endYear"] = endYearValue;
      ok = true;
    }
    return ok;
  };

  const addCheck = (e) => {
    e.target.classList.toggle("checked");
    e.target.removeAttribute("checked");
    // e.target.toggleAttribute("checked");
  };
  return (
    <Fragment>
      <h1 id="title">TFG</h1>
      {showSpinner ? (
        <div className="contenedor-principal">
          <div className="white-text">We are working on it, please wait...</div>
          <Spinner />
        </div>
      ) : (
        <div className="contenedor-principal" id="contenedorModal">
          <form onSubmit={(e) => saveAuthors(e)} className="col s12">
            <div className="input-field col s12">
              <label htmlFor="author1" className="white-text">
                Author Name:
              </label>
              <input
                type="text"
                className="writeAuthor validate white-text"
                name="author1"
              />
              <span
                className="deleted"
                role="img"
                aria-label="bin"
                onClick={(e) => {
                  deleteAuthor();
                  e.preventDefault();
                }}
              >
                🗑️
              </span>
            </div>

            <div id="test-slider">
              <Slider
                startYearValue={startYearValue}
                setstartYearValue={setstartYearValue}
                endYearValue={endYearValue}
                setendYearValue={setendYearValue}
              />
            </div>

            <div id="filtersContainer">
              <form action="#" className="filters">
                <label>
                  <input
                    type="checkbox"
                    value="checkArticles"
                    // className="checked"
                    onClick={(e) => {
                      addCheck(e);
                    }}
                  />
                  <span>Revista</span>
                </label>
                <p></p>

                <p>
                  <label>
                    <input
                      type="checkbox"
                      value="checkInproceedings"
                      // className="checked"
                      onChange={(e) => {
                        addCheck(e);
                      }}
                    />
                    <span>Inproceeding</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      type="checkbox"
                      value="checkIncollections"
                      // className="checked"
                      onChange={(e) => {
                        addCheck(e);
                      }}
                    />
                    <span>Incollections</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      type="checkbox"
                      value="checkCore"
                      // className="checked"
                      onChange={(e) => {
                        addCheck(e);
                      }}
                    />
                    <span>Core</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      type="checkbox"
                      value="checkGGS"
                      // className="checked"
                      onChange={(e) => {
                        addCheck(e);
                      }}
                    />
                    <span>Ggs</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      type="checkbox"
                      value="checkSchoolar"
                      // className="checked"
                      onChange={(e) => {
                        addCheck(e);
                      }}
                    />
                    <span>Schoolar</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      type="checkbox"
                      value="checkJRC"
                      // className="checked"
                      onChange={(e) => {
                        addCheck(e);
                      }}
                    />
                    <span>Jrc</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      type="checkbox"
                      value="checkScopus"
                      // className="checked"
                      onChange={(e) => {
                        addCheck(e);
                      }}
                    />
                    <span>Scopus</span>
                  </label>
                </p>
              </form>
            </div>
            <button
              type="button"
              id="addAuthor"
              className="btn black-text grey lighten-1"
              onClick={(e) => addAuthor(e)}
            >
              <i className="material-icons left">add_circle_outline</i>
              Add author
            </button>

            <div>
              <button
                type="submit"
                id="send"
                className="btn waves-effect waves-light"
              >
                <i className="material-icons right">send</i>
                send
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Formulario;
