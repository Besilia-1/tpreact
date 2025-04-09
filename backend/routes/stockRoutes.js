const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Définition des routes pour récupérer les stocks, historique et alertes
router.get('/stocks', stockController.getStocks);
router.get('/stocks/historique', stockController.getHistorique);
router.get('/stocks/alertes-faibles', stockController.getAlertesFaiblesStocks);

module.exports = router;