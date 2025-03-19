/**
 * Configuration CORS (Cross-Origin Resource Sharing) pour l'API
 */

const corsOptions = {
  // Origines autorisées (domaines qui peuvent accéder à l'API)
  origin: (origin, callback) => {
    // Liste des domaines autorisés (ajoutez vos domaines de production ici)
    const whitelist = [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:8080'
    ];
    
    // Permettre les requêtes sans origine (comme les applications mobiles)
    // ou les requêtes depuis des domaines dans la liste blanche
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqué par la politique CORS'));
    }
  },
  
  // Headers autorisés
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],
  
  // Méthodes HTTP autorisées
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],
  
  // Autoriser l'envoi de cookies dans les requêtes cross-origin
  credentials: true,
  
  // Durée maximale (en secondes) pendant laquelle les résultats d'une
  // requête preflight peuvent être mis en cache
  maxAge: 86400, // 24 heures
  
  // Expose ces headers aux clients
  exposedHeaders: [
    'Content-Length',
    'X-Rate-Limit'
  ]
};

module.exports = corsOptions;
