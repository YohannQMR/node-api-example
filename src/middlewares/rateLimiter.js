/**
 * Middleware pour limiter le taux de requêtes (rate limiting)
 * Implémentation simple en mémoire
 * 
 * Note: Pour une application de production, utilisez un module comme express-rate-limit
 * ou implémentez une solution utilisant Redis pour le stockage distribué
 */

class RateLimiter {
  constructor() {
    this.requests = {};
    this.resetInterval = 60 * 1000; // 1 minute en millisecondes
    this.maxRequestsPerInterval = 100; // Nombre maximum de requêtes par minute
  }

  // Nettoie périodiquement les anciennes entrées
  cleanup() {
    const now = Date.now();
    for (const ip in this.requests) {
      if (now - this.requests[ip].timestamp > this.resetInterval) {
        delete this.requests[ip];
      }
    }
  }

  // Middleware express pour limiter les requêtes
  limit(req, res, next) {
    // Nettoyer les anciennes données
    this.cleanup();

    // Identifier l'utilisateur par son IP
    const ip = req.ip;
    const now = Date.now();

    // Si c'est la première requête de cet utilisateur
    if (!this.requests[ip]) {
      this.requests[ip] = {
        timestamp: now,
        count: 1
      };
      return next();
    }

    // Réinitialiser le compteur après l'intervalle
    if (now - this.requests[ip].timestamp > this.resetInterval) {
      this.requests[ip] = {
        timestamp: now,
        count: 1
      };
      return next();
    }

    // Vérifier si l'utilisateur a dépassé le nombre maximum de requêtes
    if (this.requests[ip].count >= this.maxRequestsPerInterval) {
      return res.status(429).json({
        message: 'Trop de requêtes, veuillez réessayer plus tard'
      });
    }

    // Incrémenter le compteur
    this.requests[ip].count++;
    return next();
  }
}

// Créer une instance du limiteur de taux
const rateLimiter = new RateLimiter();

// Exporter le middleware
module.exports = (req, res, next) => rateLimiter.limit(req, res, next);
