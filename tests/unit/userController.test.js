const userController = require('../../src/controllers/userController');
const db = require('../../src/config/db');

// Mock de la base de données
jest.mock('../../src/config/db', () => ({
  query: jest.fn()
}));

describe('User Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    jest.clearAllMocks();
    
    // Mock des objets req et res
    req = {
      params: {},
      body: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' }
      ];
      
      db.query.mockResolvedValueOnce({ rows: users });

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users ORDER BY id ASC');
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String),
        error: error.message
      }));
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'Test User', email: 'test@example.com' };
      db.query.mockResolvedValueOnce({ rows: [user] });
      
      req.params.id = '1';

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', ['1']);
    });

    it('should return 404 if user not found', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });
      
      req.params.id = '999';

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('non trouvé')
      }));
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'New User',
        email: 'new.user@example.com',
        age: 30
      };
      
      const createdUser = { id: 1, ...newUser };
      db.query.mockResolvedValueOnce({ rows: [createdUser] });
      
      req.body = newUser;

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdUser);
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
        [newUser.name, newUser.email, newUser.age]
      );
    });

    it('should return 400 if required fields are missing', async () => {
      // Manque le champ name
      req.body = {
        email: 'missing.name@example.com',
        age: 25
      };

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String)
      }));
      expect(db.query).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const existingUser = {
        id: 1,
        name: 'Old Name',
        email: 'old@example.com',
        age: 25
      };
      
      const updatedUser = {
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
        age: 25
      };
      
      // Mock pour vérifier si l'utilisateur existe
      db.query.mockResolvedValueOnce({ rows: [existingUser] });
      
      // Mock pour la mise à jour
      db.query.mockResolvedValueOnce({ rows: [updatedUser] });
      
      req.params.id = '1';
      req.body = {
        name: 'Updated Name',
        email: 'updated@example.com'
      };

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should return 404 if user not found', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });
      
      req.params.id = '999';
      req.body = { name: 'Will Not Update' };

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('non trouvé')
      }));
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = { id: 1, name: 'To Delete', email: 'delete@example.com' };
      
      // Mock pour vérifier si l'utilisateur existe
      db.query.mockResolvedValueOnce({ rows: [user] });
      
      // Mock pour la suppression
      db.query.mockResolvedValueOnce({}); 
      
      req.params.id = '1';

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('supprimé')
      }));
      expect(db.query).toHaveBeenCalledWith('DELETE FROM users WHERE id = $1', ['1']);
    });

    it('should return 404 if user not found', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });
      
      req.params.id = '999';

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('non trouvé')
      }));
    });
  });
});
