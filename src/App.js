import React, { useState } from 'react';
import './App.css';
import Formulario from './components/Formulario/Formulario';
import Tabla from './components/Tabla/Tabla';

function App() {
  //state que mostrará o no el formulario
  const [show, setShow] = useState(true);

  //state que contiene el resultado de la peticion
  const [result, setresult] = useState({});

  return (
    <div className="App">
      {/* <Tabla setShow={setShow} /> */}
       {show
        ?
        <Formulario setShow={setShow} setresult={setresult} />
        :
        <Tabla setShow={setShow} result={result}/>
      } 
    </div>
  );
}

export default App;
