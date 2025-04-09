import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1>Gestion des Stocks</h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/history">
                  Historique
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/categories">
                  Catégories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/ProduitTable">
                ProduitTable
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
