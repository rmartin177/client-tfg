import React, { Fragment, useState, useEffect } from "react";
import "./Formulario.css";
import { deleteAuthor, addAuthor } from "../../js/Table/author";
import axios from "../../config/axios";
import M from "materialize-css";
import Spinner from "../Spinner/Spinner";
import ModalError from "../ModalError/ModalError"
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
    setfiltersAuthors,
    filtersAuthors,
    setsanitize,
    setShowModalError,
    showModalError
  } = props;

  const [number, setnumber] = useState(2);
  const [startYearValue, setstartYearValue] = useState("1990");
  const [endYearValue, setendYearValue] = useState("2021");
  const [login, setlogin] = useState({
    mail: "",
    pass: "",
  });

  useEffect(() => {
    //si intenta hacer esta comprobacion es que hay algun homonimo
    //if (authorsChoosen.length === number - 1) {
    if (sanitize) {
      // setSpinner(false);
      if (checkFilters) {
        setSpinner(true);
        console.log(authorsChoosen);
        const call = async () => {
          if (await getJsonSanitize(authorsChoosen, filtersAuthors)) {
            //cuando este todo ok damos paso a la siguiente pantalla y quitamos el spinner
            setSpinner(false);
            setShow(false);
          }
        };
        call();
      }
    }
  }, [authorsChoosen]);
  //objeto para comprobar si los autores se tienen homonimo
  var AuthorsApi;
  var auxBack = {};
  //Array con los nombre de los autores del formulario y los filtros
  const autores = [];

  const onChangeHandler = (e) => {
    setlogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
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
      //Activamos el spinner mientras carga la petición
      if (checkFilters()) {
        //hacemos la llamada para ver si ningún autor tiene un homonimo
        setSpinner(true);
        if (await getJson(autores, filtersAuthors)) {
          //comprobamos si los autores estan bien esccritos, si no pues modal y reload de la pagina
          console.log(AuthorsApi);
          if (AuthorsApi === "un nombre de autor no ha sido encontrado, revisa los nombres") {
            setSpinner(false);
            setShowModalError(true);
          } else {
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
    }
  };

  async function getJson(authors, filters) {
    try {
      //RESULT LO CONVIERTES A JSON Y LO MUESTRAS EN TABLAS Y LO PERMITES DESCARGAR
      //conversion a Json y lo insertamos en el state para que la tabla pueda acceder a la info

      let aux = {
        authors,
        filters: auxBack,
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
      setsanitize(false);
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
      setsanitize(false);
      return false;
    }
  }

  const checkFilters = () => {
    let ok = false;
    var filterChecked = document.querySelectorAll(
      "#filtersContainer .checkedCustom"
    );
    var filtros = document.querySelectorAll("#filtersContainer .checked");

    if (filtros.length === 0) {
      var toastHTML =
        '<span class="errorEmpty">Choose at least one filter.</span>';
      M.toast({ html: toastHTML, classes: "rounded" });
    } else {
      for (let index = 0; index < filterChecked.length; index++) {
        if (filterChecked[index].classList.contains("checked"))
          auxBack[filterChecked[index].getAttribute("value")] = true;
        else auxBack[filterChecked[index].getAttribute("value")] = false;
      }
      auxBack["initYear"] = startYearValue;
      auxBack["endYear"] = endYearValue;
      auxBack["mail"] = login.mail;
      auxBack["pass"] = login.pass;
      console.log(auxBack);
      setfiltersAuthors(auxBack);
      ok = true;
    }
    return ok;
  };

  //funcion para cambiar los checkbox
  const addCheck = (e) => {
    e.target.classList.toggle("customCheck");
    e.target.classList.toggle("checked");
    if (
      e.target.attributes.value.value === "checkJRC" ||
      e.target.attributes.value.value === "checkScopus"
    ) {
      //hay que comprobar que los dos esten en false para quitar la visibilidad
      let jcr = document.getElementById("JCRInput");
      let scopus = document.getElementById("ScopusInput");
      //ninguno esta habilitado se oculta el login
      if (
        jcr.classList.contains("customCheck") &&
        scopus.classList.contains("customCheck")
      ) {
        document.getElementById("logIn").classList.add("hidden");
      } else {
        document.getElementById("logIn").classList.remove("hidden");
      }
    }
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

            <p className="whiteText">
              University login for JCR or Scopus (need to select JCR or Scopus
              filter)
            </p>
            <div id="logIn">
              <div className="input-field col s12 loginJCR">
                <label htmlFor="user/email" className="white-text">
                  User/Email:
                </label>
                <input
                  type="text"
                  className=" validate white-text"
                  name="mail"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
              <div className="input-field col s11 loginJCR">
                <label htmlFor="password" className="white-text">
                  Password:
                </label>
                <input
                  type="password"
                  className=" validate white-text"
                  name="pass"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
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
              <div className="filters white-text">
                <div className="subClassesFilters">
                  <span className="titleFilter">Type of entry:</span>
                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkArticles"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Revista</span>
                  </div>
                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkInproceedings"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Inproceeding</span>
                  </div>
                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkIncollections"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Incollections</span>
                  </div>
                </div>

                <div className="subClassesFilters">
                  <span className="titleFilter">Metrics:</span>
                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkCore"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Core</span>
                  </div>

                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkGGS"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Ggs</span>
                  </div>

                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkJRC"
                      id="JCRInput"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Jcr</span>
                  </div>
                </div>

                <div className="subClassesFilters">
                  <span className="titleFilter ">Number of appointments:</span>
                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkSchoolar"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Scholar</span>
                  </div>

                  <div className="customCheckDiv">
                    <span
                      className="checkedCustom checked"
                      value="checkScopus"
                      id="ScopusInput"
                      onClick={(e) => {
                        addCheck(e);
                      }}
                    ></span>
                    <span>Scopus</span>
                  </div>
                </div>
              </div>
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
          {showModalError ? <ModalError /> : null}
        </div>
      )}
    </Fragment>
  );
};

export default Formulario;
