const FoodPartner = require('../models/foodPartner.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req, res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'login First'});
    } 
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await FoodPartner.findById(decoded.id);
        // Store the authenticated partner on the request so controllers can access it
        req.foodPartner = foodPartner;
        next();

    }catch(error){
        console.error('authFoodPartnerMiddleware error:', error);
        return res.status(401).json({message: 'Invalid token'});
    }


}

async function authUserMiddleware(req, res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'login First'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch(error){
        console.error('authUserMiddleware error:', error);
        return res.status(401).json({message: 'Invalid token'});
    }
}



 module.exports = { authFoodPartnerMiddleware, authUserMiddleware };