const foodModel = require('../models/food.model');
const parser = require('body-parser');
const {authFoodPartnerMiddleware} = require('../middlewares/auth.middleware');   
const storageService = require('../services/storage.service');
const { v4: uuidv4 } = require("uuid");

async function addFoodItems(req,res){
         
   console.log(req.foodPartner);

   console.log(req.body);
   console.log(req.file);

   try {
     const fileUploadResult = await storageService.uploadFile({
       file: req.file.buffer,
       fileName: uuidv4(),
     });
     console.log('File uploaded to ImageKit:', fileUploadResult);

     const foodItem = await foodModel.create({
       name: req.body.name,
       description: req.body.description,
       video: fileUploadResult.url,
       foodPartner: req.foodPartner._id,
     });

     return res.status(201).json({
       message: 'Food Item Added Successfully',
       food: foodItem,
     });
   } catch (err) {
     console.error('uploadFile error:', err);
     return res.status(500).json({ message: 'Failed to upload file', error: err.message });
   }
}

async function showFoodItems(req,res){
         const foodItems = await foodModel.find({})
         console.log(foodItems)
         res.status(200).json({
          message:"food Items fetched succesfully",
          foodItems
         })
}

module.exports = { addFoodItem: addFoodItems, showFoodItem: showFoodItems };