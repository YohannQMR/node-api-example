# Node.js API Example avec PostgreSQL

Cette API RESTful utilise Node.js, Express et PostgreSQL pour démontrer une implémentation complète de CRUD (Create, Read, Update, Delete).

## Fonctionnalités

- Architecture MVC (Model-View-Controller)
- Opérations CRUD complètes pour la gestion des utilisateurs
- Connexion à une base de données PostgreSQL
- Gestion des erreurs
- Configuration via variables d'environnement

## Prérequis

- Node.js (v14+)
- PostgreSQL
- npm ou yarn

## Installation

1. Cloner le dépôt
   ```
   git clone https://github.com/YohannQMR/node-api-example.git
   cd node-api-example
   ```

2. Installer les dépendances
   ```
   npm install
   ```

3. Configurer les variables d'environnement
   ```
   cp .env.example .env
   ```
   Puis modifiez le fichier `.env` avec vos propres paramètres de configuration PostgreSQL.

4. Créer et initialiser la base de données dans PostgreSQL
   ```
   createdb node_api_example
   node src/scripts/setup-db.js
   ```

## Démarrage

1. Démarrer le serveur
   ```
   npm start
   ```

2. Pour le développement (avec hot-reload)
   ```
   npm run dev
   ```

Le serveur sera accessible à l'adresse http://localhost:3000

## Structure du projet

```
├── src/
│   ├── config/          # Configuration (base de données)
│   ├── controllers/     # Contrôleurs
│   ├── routes/          # Routes API
│   ├── scripts/         # Scripts utilitaires
│   └── server.js        # Point d'entrée de l'application
├── .env.example         # Exemple de variables d'environnement
├── .gitignore           # Fichiers ignorés par Git
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

## Exemple de requêtes

### Créer un utilisateur
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Marie Dupont","email":"marie.dupont@example.com","age":28}'
```

### Récupérer tous les utilisateurs
```bash
curl http://localhost:3000/api/users
```

### Mettre à jour un utilisateur
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Marie Martin"}'
```

### Supprimer un utilisateur
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Licence

MIT
