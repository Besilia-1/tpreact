import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ProduitDetail from './pages/ProduitDetail';
import History from './pages/History';
import CategoriesPage from './pages/CategoriesPage';
import ProduitTable from './pages/ProduitTable';

import { Produit } from './types'; // Assure-toi que ce type est bien défini

const App: React.FC = () => {
  const [produits, setProduits] = useState<Produit[]>([
    { id: 1, nom: 'Produit 1', description: 'Description 1', unite_mesure: 'kg', categorie_id: 1 },
    { id: 2, nom: 'Produit 2', description: 'Description 2', unite_mesure: 'm', categorie_id: 2 },
  ]);

  const [produitEnEdition, setProduitEnEdition] = useState<Produit | null>(null);

  const categories = [
    { id: 1, nom: 'Catégorie 1', description: 'Description catégorie 1' },
    { id: 2, nom: 'Catégorie 2', description: 'Description catégorie 2' },
  ];

  const onDelete = (id: number) => {
    setProduits(produits.filter(p => p.id !== id));
  };

  const onSubmit = (produit: Produit) => {
    if (produit.id) {
      // Mise à jour
      setProduits(produits.map(p => (p.id === produit.id ? produit : p)));
    } else {
      // Ajout
      const newId = Math.max(...produits.map(p => p.id || 0), 0) + 1;
      setProduits([...produits, { ...produit, id: newId }]);
    }
    setProduitEnEdition(null);
  };

  const annulerEdition = () => {
    setProduitEnEdition(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProduitDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route
          path="/produitTable"
          element={
            <ProduitTable
              produits={produits}
              categories={categories}
              onDelete={onDelete}
              onSubmit={onSubmit}
              produitEnEdition={produitEnEdition}
              annulerEdition={annulerEdition}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
