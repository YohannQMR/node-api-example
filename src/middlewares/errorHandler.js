/**
 * Middleware pour la gestion centralisée des erreurs
 * Capture et formate les erreurs de l'application
 */

const { logError } = require('../utils/logger');

// Middleware pour capturer les erreurs asynchrones
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
  // Logger l'erreur
  logError(err, req);

  // Déterminer le code de statut HTTP
  const statusCode = err.statusCode || 500;

  // Construire la réponse d'erreur
  const errorResponse = {
    message: err.message || 'Erreur interne du serveur',
    status: statusCode
  };

  // Ajouter les détails techniques uniquement en environnement de développement
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
    errorResponse.details = err.details || {};
  }

  // Envoyer la réponse d'erreur
  res.status(statusCode).json(errorResponse);
};

// Middleware pour les routes non trouvées (404)
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  asyncHandler,
  errorHandler,
  notFoundHandler
};
