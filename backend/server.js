const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Rutas
const reservasRouter = require('./reservas'); // Importa el enrutador de reservas
app.use('/api', reservasRouter); // Prefijo '/api' para todas las rutas de reservas

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor Node.js está funcionando correctamente.');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
