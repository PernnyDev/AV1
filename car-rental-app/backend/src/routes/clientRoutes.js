const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Outras rotas de clientes
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

// Rota para buscar o histórico de locações de um cliente
router.get('/:clientId/rentals', clientController.getClientRentals);

module.exports = router;