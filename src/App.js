import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListaReservas from './ListaReservas'; 
import FormularioReserva from './FormularioReserva'; // Importas el componente del formulario

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='reservastitulo'>Reservas</h1>
        <div>
        {/* El componente FormularioReserva permite a los usuarios añadir nuevas reservas */}
        <FormularioReserva />
        </div>
       </header>

       <body>
        <div>
        {/* El componente ListaReservas se incluirá aquí y mostrará las reservas */}
        <ListaReservas />
        </div> 
        {/* Este enlace se puede quitar o modificar según tus necesidades */}
       </body>
    </div>
  );
}

export default App;

