const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner,logoutFoodPartner } = require('../controllers/auth.controller');

// body parser
router.use(express.json());

// route for user registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

// route for foodPartner
router.post('/foodPartner/register', registerFoodPartner);
router.post('/foodPartner/login', loginFoodPartner);
router.get('/foodPartner/logout', logoutFoodPartner);




module.exports = router;