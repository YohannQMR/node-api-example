const db = require('../config/db');

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
  }
};

// Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} non trouvé` });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
    res.status(500).json({ message: `Erreur lors de la récupération de l'utilisateur ${id}`, error: error.message });
  }
};

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  
  // Validation simple
  if (!name || !email) {
    return res.status(400).json({ message: 'Le nom et l\'email sont requis' });
  }
  
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
  }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  
  // Validation simple
  if (!name && !email && !age) {
    return res.status(400).json({ message: 'Au moins un champ à mettre à jour est requis' });
  }
  
  try {
    // Vérifier si l'utilisateur existe
    const checkUser = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (checkUser.rows.length === 0) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} non trouvé` });
    }
    
    // Construire la requête dynamiquement en fonction des champs fournis
    const existingUser = checkUser.rows[0];
    const updatedName = name !== undefined ? name : existingUser.name;
    const updatedEmail = email !== undefined ? email : existingUser.email;
    const updatedAge = age !== undefined ? age : existingUser.age;
    
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
      [updatedName, updatedEmail, updatedAge, id]
    );
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
    res.status(500).json({ message: `Erreur lors de la mise à jour de l'utilisateur ${id}`, error: error.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Vérifier si l'utilisateur existe
    const checkUser = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (checkUser.rows.length === 0) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} non trouvé` });
    }
    
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    
    res.status(200).json({ message: `Utilisateur avec l'ID ${id} supprimé avec succès` });
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
    res.status(500).json({ message: `Erreur lors de la suppression de l'utilisateur ${id}`, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
