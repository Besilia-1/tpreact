-- Création de la base de données
CREATE DATABASE storage_management;

-- Table des entreprises
CREATE TABLE entreprises (
    entreprise_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    adresse TEXT,
    telephone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des utilisateurs
CREATE TABLE utilisateurs (
    utilisateur_id INT PRIMARY KEY AUTO_INCREMENT,
    entreprise_id INT,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role_id INT,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(entreprise_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL
);

-- Table des rôles
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL
);

-- Table des droits (permissions)
CREATE TABLE droits (
    droit_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT
);

-- Table des catégories
CREATE TABLE categories (
    categorie_id INT PRIMARY KEY AUTO_INCREMENT,
    entreprise_id INT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(entreprise_id) ON DELETE CASCADE
);

-- Table des produits
CREATE TABLE produits (
    produit_id INT PRIMARY KEY AUTO_INCREMENT,
    entreprise_id INT,
    categorie_id INT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    unite_mesure VARCHAR(50),
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(entreprise_id) ON DELETE CASCADE,
    FOREIGN KEY (categorie_id) REFERENCES categories(categorie_id) ON DELETE SET NULL
);

-- Table des stocks
CREATE TABLE stocks (
    stock_id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT,
    quantite INT NOT NULL,
    emplacement VARCHAR(255),
    date_maj DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES produits(produit_id) ON DELETE CASCADE
);

-- Table des mouvements de stock (entrées, sorties)
CREATE TABLE mouvements_stock (
    mouvement_id INT PRIMARY KEY AUTO_INCREMENT,
    produit_id INT,
    utilisateur_id INT,
    type VARCHAR(50) NOT NULL, -- 'entrée' ou 'sortie'
    quantite INT NOT NULL,
    date_mouvement DATETIME DEFAULT CURRENT_TIMESTAMP,
    commentaire TEXT,
    FOREIGN KEY (produit_id) REFERENCES produits(produit_id) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(utilisateur_id) ON DELETE SET NULL
);

-- Table de liaison entre rôles et droits (pour gérer les permissions)
CREATE TABLE role_droit (
    role_id INT,
    droit_id INT,
    PRIMARY KEY (role_id, droit_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    FOREIGN KEY (droit_id) REFERENCES droits(droit_id) ON DELETE CASCADE
);

-- Table pour stocker la personnalisation des tableaux par entreprise
CREATE TABLE tableau_personnalisation (
    personnalisation_id INT PRIMARY KEY AUTO_INCREMENT,
    entreprise_id INT,
    entite VARCHAR(50) NOT NULL,  -- Exemple: 'produits', 'stocks', 'mouvements_stock'
    colonnes JSON NOT NULL,       -- Liste des colonnes sélectionnées
    date_maj DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(entreprise_id) ON DELETE CASCADE
);