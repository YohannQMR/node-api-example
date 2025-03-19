/**
 * Module de journalisation (logging)
 * Centralise la gestion des logs de l'application
 */

const fs = require('fs');
const path = require('path');

// S'assurer que le répertoire de logs existe
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Format de la date pour les logs
const getTimestamp = () => {
  return new Date().toISOString();
};

// Logger un message informatif
const logInfo = (message, meta = {}) => {
  const logMessage = {
    level: 'info',
    timestamp: getTimestamp(),
    message,
    ...meta
  };
  
  // En développement, afficher dans la console
  if (process.env.NODE_ENV === 'development') {
    console.log(`\x1b[36m[INFO]\x1b[0m: ${message}`, meta);
  }
  
  // Écrire dans le fichier de log
  appendToLogFile('info', logMessage);
};

// Logger un avertissement
const logWarning = (message, meta = {}) => {
  const logMessage = {
    level: 'warning',
    timestamp: getTimestamp(),
    message,
    ...meta
  };
  
  // En développement, afficher dans la console
  if (process.env.NODE_ENV === 'development') {
    console.log(`\x1b[33m[WARNING]\x1b[0m: ${message}`, meta);
  }
  
  // Écrire dans le fichier de log
  appendToLogFile('warning', logMessage);
};

// Logger une erreur
const logError = (error, req = {}) => {
  const logMessage = {
    level: 'error',
    timestamp: getTimestamp(),
    message: error.message,
    stack: error.stack,
    path: req.originalUrl || '',
    method: req.method || '',
    ip: req.ip || '',
    user: req.user ? req.user.id : 'anonymous'
  };
  
  // En développement, afficher dans la console
  if (process.env.NODE_ENV === 'development') {
    console.error(`\x1b[31m[ERROR]\x1b[0m: ${error.message}`);
    console.error(error.stack);
  }
  
  // Écrire dans le fichier de log
  appendToLogFile('error', logMessage);
};

// Ajouter un message au fichier de log
const appendToLogFile = (level, logMessage) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logDir, `${level}-${today}.log`);
    
    fs.appendFileSync(logFile, JSON.stringify(logMessage) + '\n');
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement du log:', err);
  }
};

module.exports = {
  logInfo,
  logWarning,
  logError
};
