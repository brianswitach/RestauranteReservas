import React, { useState } from 'react';

const FormularioReserva = () => {
  const [reserva, setReserva] = useState({
    nombreCliente: '',
    apellidoCliente: '',
    fechaReserva: '',
    horaReserva: '',
    numeroPersonas: '',
    telefonoContacto: '',
    informacionAdicional: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva({ ...reserva, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reserva),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Reserva creada:', data);
      setReserva({
        nombreCliente: '',
        apellidoCliente: '',
        fechaReserva: '',
        horaReserva: '',
        numeroPersonas: '',
        telefonoContacto: '',
        informacionAdicional: ''
      });
    })
    .catch((error) => {
      console.error('Error al crear reserva:', error);
    });
  };

  return (
    <div className="App-header"> {/* Usa App-header para mantener el estilo del header */}
      <div className="form-container"> {/* Contenedor del formulario con el estilo definido */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Cliente:</label>
            <input type="text" name="nombreCliente" value={reserva.nombreCliente} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Apellido del Cliente:</label>
            <input type="text" name="apellidoCliente" value={reserva.apellidoCliente} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Fecha de Reserva:</label>
            <input type="date" name="fechaReserva" value={reserva.fechaReserva} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Hora de Reserva:</label>
            <input type="time" name="horaReserva" value={reserva.horaReserva} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Número de Personas:</label>
            <input type="number" name="numeroPersonas" value={reserva.numeroPersonas} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Teléfono de Contacto:</label>
            <input type="text" name="telefonoContacto" value={reserva.telefonoContacto} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Información Adicional:</label>
            <textarea name="informacionAdicional" value={reserva.informacionAdicional} onChange={handleChange} />
          </div>
          <button type="submit">Crear Reserva</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioReserva;