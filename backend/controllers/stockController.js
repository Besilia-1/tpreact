const stockModel = require('../models/stockModel');

// Fonction pour récupérer les stocks avec des filtres
const getStocks = (req, res) => {
  const filters = req.query;

  stockModel.getStocks(filters)
    .then(stocks => {
      res.json(stocks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Erreur lors de la récupération des stocks', error: err });
    });
};

// Fonction pour récupérer l'historique des mouvements
const getHistorique = (req, res) => {
  stockModel.getHistorique()
    .then(historique => {
      res.json(historique);
    })
    .catch(err => {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique', error: err });
    });
};

// Fonction pour récupérer les alertes des stocks faibles
const getAlertesFaiblesStocks = (req, res) => {
  stockModel.getAlertesFaiblesStocks()
    .then(alertes => {
      res.json(alertes);
    })
    .catch(err => {
      res.status(500).json({ message: 'Erreur lors de la récupération des alertes', error: err });
    });
};

module.exports = {
  getStocks,
  getHistorique,
  getAlertesFaiblesStocks
};