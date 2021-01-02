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
          />
          {showModal ? (
            <Modal
              listOfAuthors={authorsModal}
              showModal={showModal}
              setauthorsChoosen={setauthorsChoosen}
              authorsChoosen={authorsChoosen}
              setsanitize={setsanitize}
            />
          ) : null}
        </Fragment>
      ) : (
        <Tabla setShow={setShow} result={result} />
      )}
    </div>
  );
}

export default App;
