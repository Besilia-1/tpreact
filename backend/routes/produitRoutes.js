const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

// Route pour ajouter un produit
router.post('/', produitController.ajouterProduit);

// Route pour récupérer tous les produits
router.get('/', produitController.getProduits);

// Route pour supprimer un produit
router.delete('/:id', produitController.supprimerProduit);

module.exports = router;