const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Rota para criar um novo cliente
router.post('/clients', clientController.createClient);

// Rota para listar todos os clientes
router.get('/clients', clientController.getAllClients);

// Rota para obter um cliente por ID
router.get('/clients/:id', clientController.getClientById);

// Rota para atualizar um cliente
router.put('/clients/:id', clientController.updateClient);

// Rota para excluir um cliente
router.delete('/clients/:id', clientController.deleteClient);

module.exports = router;