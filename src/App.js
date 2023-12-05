import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListaReservas from './ListaReservas'; 
import FormularioReserva from './FormularioReserva'; // Importas el componente del formulario

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Bienvenido a la aplicación de reservas</h1>
        {/* El componente FormularioReserva permite a los usuarios añadir nuevas reservas */}
        <FormularioReserva />
        {/* El componente ListaReservas se incluirá aquí y mostrará las reservas */}
        <ListaReservas />
        {/* Este enlace se puede quitar o modificar según tus necesidades */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprende React
        </a>
      </header>
    </div>
  );
}

export default App;

