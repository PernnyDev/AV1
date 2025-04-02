const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');
const clientRoutes = require('./routes/clientRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/api', vehicleRoutes);
app.use('/api', clientRoutes);
app.use('/api', rentalRoutes);
app.use('/api', statsRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});