// Configuration des tests pour l'environnement Jest

// Configuration de dotenv pour les tests
require('dotenv').config({ path: '.env.test' });

// Délai d'attente global pour les tests
jest.setTimeout(30000);

// Suppression des avertissements de console pendant les tests
console.warn = jest.fn();
