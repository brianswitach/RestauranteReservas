import React, { useState, useEffect } from 'react';

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Asegúrate de que la dirección corresponda con tu servidor backend y puerto
    fetch('http://localhost:3001/api/reservas')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('La solicitud a la API falló');
      })
      .then(data => setReservas(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1 className="lista-reservas-titulo">Listado de Reservas</h1>
      {reservas.length > 0 ? (
        <ul>
          {reservas.map(reserva => (
            <li key={reserva.id}>
              {/* Asegúrate de cambiar estos campos por los que correspondan con tu esquema de datos */}
              <p className='lista-reservas-clientes'>{reserva.nombreCliente} - {reserva.horaReserva}</p>
              {/* Agrega más detalles de la reserva aquí */}
            </li>
          ))}
        </ul>
      ) : (
        <p className='lista-reservas-titulo'>No hay reservas disponibles.</p>
      )}
    </div>
  );
};

export default ListaReservas;
