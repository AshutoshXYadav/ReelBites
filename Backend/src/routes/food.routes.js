const express = require('express');
const router = express.Router();
const { addFoodItem, showFoodItem} = require('../controllers/food.controller');
const { authFoodPartnerMiddleware, authUserMiddleware} = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()}); // Store files in memory for processing});


// routes for food items
router.post('/add', authFoodPartnerMiddleware,upload.single("video"), addFoodItem);
router.get('/show', authUserMiddleware, showFoodItem);


module.exports = router;


