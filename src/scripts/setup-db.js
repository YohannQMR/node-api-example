const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

// Chemin vers le fichier SQL d'initialisation
const initSqlPath = path.join(__dirname, 'init-db.sql');

async function setupDatabase() {
  try {
    // Lire le contenu du fichier SQL
    const initSql = fs.readFileSync(initSqlPath, 'utf8');
    
    // Se connecter à la base de données et exécuter le script SQL
    const client = await pool.connect();
    
    console.log('Initialisation de la base de données...');
    await client.query(initSql);
    
    console.log('La base de données a été initialisée avec succès!');
    client.release();
    
    // Fermer le pool de connexions
    await pool.end();
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

// Exécuter la fonction d'initialisation
setupDatabase();
