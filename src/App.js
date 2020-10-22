import React, { useState } from 'react';
import './App.css';
import Formulario from './components/Formulario/Formulario';
import Tabla from './components/Tabla/Tabla';

function App() {
  const [mostrar, setmostrar] = useState(true);

  return (
    <div className="App">
      {mostrar
        ?
        <Formulario setmostrar={setmostrar} />
        :
        <Tabla setmostrar={setmostrar} />
      }
    </div>
  );
}

export default App;
