const { Pool } = require('pg');

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'node_api_example',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'password',
});

// Test de connexion à la base de données
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à la base de données PostgreSQL:', err.stack);
  } else {
    console.log('Connexion à la base de données PostgreSQL établie avec succès');
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
