const request = require('supertest');
const { app, server } = require('../../src/server');
const db = require('../../src/config/db');

// Mock de la base de données pour les tests
jest.mock('../../src/config/db', () => ({
  query: jest.fn(),
  pool: {
    connect: jest.fn(),
    end: jest.fn()
  }
}));

describe('User API Endpoints', () => {
  afterAll(async () => {
    // Fermer le serveur après tous les tests
    await server.close();
  });

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      // Mock de la réponse de la base de données
      db.query.mockResolvedValueOnce({
        rows: [
          { id: 1, name: 'Test User 1', email: 'test1@example.com', age: 25 },
          { id: 2, name: 'Test User 2', email: 'test2@example.com', age: 30 }
        ],
        rowCount: 2
      });

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users ORDER BY id ASC');
    });

    it('should handle database errors', async () => {
      // Mock d'une erreur de base de données
      db.query.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a single user', async () => {
      // Mock de la réponse de la base de données
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, name: 'Test User', email: 'test@example.com', age: 25 }],
        rowCount: 1
      });

      const response = await request(app).get('/api/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', ['1']);
    });

    it('should return 404 for non-existent user', async () => {
      // Mock d'un utilisateur non trouvé
      db.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      });

      const response = await request(app).get('/api/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'New User',
        email: 'new.user@example.com',
        age: 28
      };

      // Mock de la réponse de la base de données
      db.query.mockResolvedValueOnce({
        rows: [{ id: 3, ...newUser }],
        rowCount: 1
      });

      const response = await request(app)
        .post('/api/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should return 400 for invalid user data', async () => {
      const invalidUser = {
        // Missing required name
        email: 'invalid@example.com',
        age: 30
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update an existing user', async () => {
      const updates = {
        name: 'Updated User',
        email: 'updated@example.com'
      };

      // Mock de la vérification de l'utilisateur
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, name: 'Old Name', email: 'old@example.com', age: 25 }],
        rowCount: 1
      });

      // Mock de la mise à jour
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, name: updates.name, email: updates.email, age: 25 }],
        rowCount: 1
      });

      const response = await request(app)
        .put('/api/users/1')
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', updates.name);
      expect(response.body).toHaveProperty('email', updates.email);
    });

    it('should return 404 for non-existent user', async () => {
      // Mock d'un utilisateur non trouvé
      db.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      });

      const response = await request(app)
        .put('/api/users/999')
        .send({ name: 'Will Not Update' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      // Mock de la vérification de l'utilisateur
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, name: 'To Delete', email: 'delete@example.com' }],
        rowCount: 1
      });

      // Mock de la suppression
      db.query.mockResolvedValueOnce({
        rowCount: 1
      });

      const response = await request(app).delete('/api/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 for non-existent user', async () => {
      // Mock d'un utilisateur non trouvé
      db.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      });

      const response = await request(app).delete('/api/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
