const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Rota para obter estatísticas
router.get('/stats', statsController.getStats);

module.exports = router;