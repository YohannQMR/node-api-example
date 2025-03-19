-- Fichier d'initialisation de la base de données

-- Supprimer la table si elle existe déjà
DROP TABLE IF EXISTS users;

-- Créer la table utilisateurs
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ajouter quelques utilisateurs de test
INSERT INTO users (name, email, age) VALUES
  ('John Doe', 'john.doe@example.com', 30),
  ('Jane Smith', 'jane.smith@example.com', 25),
  ('Bob Johnson', 'bob.johnson@example.com', 40);

-- Créer une fonction pour mettre à jour automatiquement la date de modification
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer un déclencheur (trigger) pour mettre à jour la date de modification
CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
