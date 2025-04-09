const Produit = require('../models/produitModel');

const ajouterProduit = (req, res) => {
  const data = req.body;

  if (!data.nom || !data.entreprise_id || !data.categorie_id) {
    return res.status(400).json({ message: 'Le nom, l\'entreprise_id et le categorie_id sont requis' });
  }

  Produit.ajouterProduit(data, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de l\'ajout du produit' });
    res.status(201).json({ message: 'Produit ajouté avec succès', produit_id: result.insertId });
  });
};

const getProduits = (req, res) => {
  Produit.getProduits((err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
    res.json(results);
  });
};

const supprimerProduit = (req, res) => {
  const { id } = req.params;
  Produit.supprimerProduit(id, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
    res.json({ message: 'Produit supprimé avec succès' });
  });
};

module.exports = {
  ajouterProduit,
  getProduits,
  supprimerProduit
};