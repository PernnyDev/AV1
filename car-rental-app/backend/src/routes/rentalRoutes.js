const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Rota para criar uma nova locação
router.post('/rentals', rentalController.createRental);

// Rota para listar todas as locações
router.get('/rentals', rentalController.getAllRentals);

// Rota para obter uma locação por ID
router.get('/rentals/:id', rentalController.getRentalById);

// Rota para atualizar uma locação
router.put('/rentals/:id', rentalController.updateRental);

// Rota para excluir uma locação
router.delete('/rentals/:id', rentalController.deleteRental);

module.exports = router;