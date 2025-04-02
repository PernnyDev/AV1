const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Rota para criar um novo veículo
router.post('/vehicles', vehicleController.createVehicle);

// Rota para listar todos os veículos
router.get('/vehicles', vehicleController.getAllVehicles);

// Rota para obter um veículo por ID
router.get('/vehicles/:id', vehicleController.getVehicleById);

// Rota para atualizar um veículo
router.put('/vehicles/:id', vehicleController.updateVehicle);

// Rota para excluir um veículo
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

module.exports = router;