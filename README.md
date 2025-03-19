# Node.js API Example avec PostgreSQL

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/YohannQMR/node-api-example/ci.yml?branch=main&style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/YohannQMR/node-api-example?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

Cette API RESTful utilise Node.js, Express et PostgreSQL pour démontrer une implémentation complète de CRUD (Create, Read, Update, Delete).

## Fonctionnalités

- Architecture MVC (Model-View-Controller)
- Opérations CRUD complètes pour la gestion des utilisateurs
- Connexion à une base de données PostgreSQL
- Documentation API avec Swagger
- Sécurité avancée (CORS, Helmet, Rate limiting)
- Validation des données avec express-validator
- Tests unitaires et d'intégration avec Jest
- Gestion des erreurs et logging
- Intégration continue avec GitHub Actions

## Prérequis

- Node.js (v14+)
- PostgreSQL
- npm ou yarn

## Installation

1. Cloner le dépôt
   ```bash
   git clone https://github.com/YohannQMR/node-api-example.git
   cd node-api-example
   ```

2. Installer les dépendances
   ```bash
   npm install
   ```

3. Configurer les variables d'environnement
   ```bash
   cp .env.example .env
   ```
   Puis modifiez le fichier `.env` avec vos propres paramètres de configuration PostgreSQL.

4. Créer et initialiser la base de données dans PostgreSQL
   ```bash
   createdb node_api_example
   node src/scripts/setup-db.js
   ```

## Démarrage

1. Démarrer le serveur
   ```bash
   npm start
   ```

2. Pour le développement (avec hot-reload)
   ```bash
   npm run dev
   ```

Le serveur sera accessible à l'adresse http://localhost:3000

La documentation Swagger de l'API est disponible à l'adresse http://localhost:3000/api-docs

## Tests

Exécuter les tests unitaires et d'intégration
```bash
npm test
```

Générer un rapport de couverture de tests
```bash
npm run test:coverage
```

## Structure du projet

```
├── .github/            # Configuration GitHub Actions
├── logs/               # Fichiers de logs (générés automatiquement)
├── src/
│   ├── config/          # Configuration (base de données, CORS)
│   ├── controllers/     # Contrôleurs
│   ├── middlewares/     # Middlewares (validation, sécurité)
│   ├── routes/          # Routes API
│   ├── scripts/         # Scripts utilitaires
│   ├── utils/           # Fonctions utilitaires
│   └── server.js        # Point d'entrée de l'application
├── tests/
│   ├── integration/     # Tests d'intégration
│   ├── unit/            # Tests unitaires
│   └── setup.js         # Configuration des tests
├── .env.example         # Exemple de variables d'environnement
├── .env.test            # Variables d'environnement pour les tests
├── .gitignore           # Fichiers ignorés par Git
├── jest.config.js       # Configuration Jest
├── package.json         # Dépendances et scripts
└── README.md            # Documentation du projet
```

## API Endpoints

### Utilisateurs

- **GET /api/users** - Récupérer tous les utilisateurs
- **GET /api/users/:id** - Récupérer un utilisateur par ID
- **POST /api/users** - Créer un nouvel utilisateur
- **PUT /api/users/:id** - Mettre à jour un utilisateur existant
- **DELETE /api/users/:id** - Supprimer un utilisateur

## Sécurité

Cette API implémente plusieurs couches de sécurité :

- Protection CORS avec whitelist de domaines
- En-têtes de sécurité avec Helmet
- Validation des entrées utilisateur
- Protection contre les attaques par force brute (rate limiting)
- Prévention des injections SQL
- Journalisation des accès et des erreurs

## CI/CD

Le projet utilise GitHub Actions pour :

- Exécuter les tests automatiquement à chaque push et pull request
- Vérifier la qualité du code 
- Générer des rapports de couverture de tests

## Prochaines étapes

Consultez les [issues GitHub](https://github.com/YohannQMR/node-api-example/issues) pour voir les fonctionnalités prévues.

## Licence

MIT
