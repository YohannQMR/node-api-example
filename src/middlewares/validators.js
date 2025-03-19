const { body, validationResult } = require('express-validator');

// Middleware de validation pour un utilisateur
const validateUser = [
  // Validation du nom
  body('name')
    .notEmpty().withMessage('Le nom est requis')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères'),
  
  // Validation de l'email
  body('email')
    .notEmpty().withMessage('L\'email est requis')
    .trim()
    .isEmail().withMessage('Adresse email invalide')
    .normalizeEmail(),
  
  // Validation de l'âge (optionnel)
  body('age')
    .optional()
    .isInt({ min: 0, max: 120 }).withMessage('L\'\u00e2ge doit être un nombre entier entre 0 et 120'),
  
  // Middleware pour gérer les erreurs de validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Erreur de validation des données', 
        errors: errors.array() 
      });
    }
    next();
  }
];

module.exports = {
  validateUser
};
