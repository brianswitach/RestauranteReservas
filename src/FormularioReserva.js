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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Cliente:
        <input type="text" name="nombreCliente" value={reserva.nombreCliente} onChange={handleChange} />
      </label>
      <label>
        Apellido del Cliente:
        <input type="text" name="apellidoCliente" value={reserva.apellidoCliente} onChange={handleChange} />
      </label>
      <label>
        Fecha de Reserva:
        <input type="date" name="fechaReserva" value={reserva.fechaReserva} onChange={handleChange} />
      </label>
      <label>
        Hora de Reserva:
        <input type="time" name="horaReserva" value={reserva.horaReserva} onChange={handleChange} />
      </label>
      <label>
        Número de Personas:
        <input type="number" name="numeroPersonas" value={reserva.numeroPersonas} onChange={handleChange} />
      </label>
      <label>
        Teléfono de Contacto:
        <input type="text" name="telefonoContacto" value={reserva.telefonoContacto} onChange={handleChange} />
      </label>
      <label>
        Información Adicional:
        <textarea name="informacionAdicional" value={reserva.informacionAdicional} onChange={handleChange}></textarea>
      </label>
      <button type="submit">Crear Reserva</button>
    </form>
  );
};

export default FormularioReserva;
