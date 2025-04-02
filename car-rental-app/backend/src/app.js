const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const vehicleRoutes = require('./routes/vehicleRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const clientRoutes = require('./routes/clientRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/stats', statsRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});