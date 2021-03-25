import React, { Fragment, useState } from "react";
import "./App.css";
import Formulario from "./components/Formulario/Formulario";
import Tabla from "./components/Tabla/Tabla";
import Modal from "./components/Modal/Modal";

function App() {
  //state que mostrará o no el formulario
  const [show, setShow] = useState(true);
  //state que contiene el resultado de la peticion
  const [result, setresult] = useState([]);
  //state que mostrara o no el modal
  const [showModal, setShowModal] = useState(false);
  //state que muestra los autores en el modal
  const [authorsModal, setauthorsModal] = useState([]);
  //state para los autores elegidos dentro del modal
  const [authorsChoosen, setauthorsChoosen] = useState([]);
  //state para hacer la llamada a GetSanitize
  const [sanitize, setsanitize] = useState(false);
  //state para el loading
  const [showSpinner, setSpinner] = useState(false);
  //state para lo que busca el usuario poder verlo en el modal
  const [userSearch, setuserSearch] = useState("");
  //state para los filtros
  const [filtersAuthors, setfiltersAuthors] = useState({
    checkInproceedings: true,
    checkArticles: true,
    checkIncollections: true,
    checkSchoolar: true,
    checkGGS: true,
    checkCore: true,
    checkScopus: true,
    checkJCR: true,
    mail: "",
    pass: "",
    initYear: "1990",
    endYear: "2021",
  });

  return (
    <div className="App">
      {show ? (
        <Fragment>
          <Formulario
            setShow={setShow}
            setresult={setresult}
            setShowModal={setShowModal}
            setauthorsModal={setauthorsModal}
            authorsChoosen={authorsChoosen}
            setauthorsChoosen={setauthorsChoosen}
            sanitize={sanitize}
            showSpinner={showSpinner}
            setsanitize={setsanitize}
            setSpinner={setSpinner}
            setfiltersAuthors={setfiltersAuthors}
            filtersAuthors={filtersAuthors}
            setuserSearch={setuserSearch}
          />
          {showModal ? (
            <Modal
              listOfAuthors={authorsModal}
              showModal={showModal}
              setauthorsChoosen={setauthorsChoosen}
              authorsChoosen={authorsChoosen}
              setsanitize={setsanitize}
              setSpinner={setSpinner}
              userSearch={userSearch}
            />
          ) : null}
        </Fragment>
      ) : (
        <Tabla
          setShow={setShow}
          result={result}
          filtersAuthors={filtersAuthors}
        />
      )}
    </div>
  );
}

export default App;
