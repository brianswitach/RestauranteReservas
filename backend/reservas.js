const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'bsitich1/', // Asegúrate de cambiar esto por tu contraseña real
  database: 'reservas'
});

// Establecer la conexión con la base de datos
connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log("Conectado exitosamente a la base de datos MySQL.");
});

// Ruta para crear una nueva reserva
router.post('/reservas', (req, res) => {
  const { nombreCliente, apellidoCliente, fechaReserva, horaReserva, numeroPersonas, telefonoContacto, informacionAdicional } = req.body;
  const query = `INSERT INTO cantidadreservas (nombreCliente, apellidoCliente, fechaReserva, horaReserva, numeroPersonas, telefonoContacto, informacionAdicional) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  connection.query(query, [nombreCliente, apellidoCliente, fechaReserva, horaReserva, numeroPersonas, telefonoContacto, informacionAdicional], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: "Error al crear la reserva", error: error.sqlMessage });
      return;
    }
    res.status(201).json({ message: `Reserva creada con ID: ${results.insertId}` });
  });
});

// Ruta para obtener todas las reservas
router.get('/reservas', (req, res) => {
  connection.query('SELECT * FROM cantidadreservas', (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: "Error al obtener reservas", error: error.sqlMessage });
      return;
    }
    res.status(200).json(results);
  });
});

// Ruta para obtener una reserva específica por ID
router.get('/reservas/:id', (req, res) => {
  const reservaId = req.params.id;
  connection.query('SELECT * FROM cantidadreservas WHERE idReserva = ?', [reservaId], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: `Error al obtener reserva con ID: ${reservaId}`, error: error.sqlMessage });
      return;
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).send('Reserva no encontrada');
    }
  });
});

// Ruta para actualizar una reserva existente
router.put('/reservas/:id', (req, res) => {
  const reservaId = req.params.id;
  const cambiosReserva = req.body;
  connection.query('UPDATE cantidadreservas SET ? WHERE idReserva = ?', [cambiosReserva, reservaId], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: `Error al actualizar reserva con ID: ${reservaId}`, error: error.sqlMessage });
      return;
    }
    if (results.affectedRows > 0) {
      res.status(200).send(`Reserva con ID ${reservaId} actualizada.`);
    } else {
      res.status(404).send('Reserva no encontrada o sin cambios.');
    }
  });
});

// Ruta para eliminar una reserva
router.delete('/reservas/:id', (req, res) => {
  const reservaId = req.params.id;
  connection.query('DELETE FROM cantidadreservas WHERE idReserva = ?', [reservaId], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ message: `Error al eliminar reserva con ID: ${reservaId}`, error: error.sqlMessage });
      return;
    }
    if (results.affectedRows > 0) {
      res.status(200).send(`Reserva con ID ${reservaId} eliminada.`);
    } else {
      res.status(404).send('Reserva no encontrada.');
    }
  });
});

module.exports = router;
