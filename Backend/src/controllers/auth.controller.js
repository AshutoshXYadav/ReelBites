const cookies = require('cookie-parser');

const userModel = require('../models/User.Model');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

function getCookieOptions() {
    const isProd = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        sameSite: 'lax',
        secure: isProd,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
}

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // use userModel to query
        const ifUserExist = await userModel.findOne({ email });
        if (ifUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hash(password, 10);
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            
        });
        await user.save();

        const token = sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, getCookieOptions());
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('registerUser error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, getCookieOptions());
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('loginUser error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
}


// foodPartner functions
const foodPartnerModel = require('../models/foodPartner.model');
async function registerFoodPartner(req, res) {
    try{
        const {name, email, password, phone, address, contactName} = req.body;
        const ifFoodPartnerExist = await foodPartnerModel.findOne({email});
        if(ifFoodPartnerExist){
            return res.status(400).json({message: 'Food Partner already exists'});
        }
        const hashedPassword = await hash(password, 10);
        const foodPartner = new foodPartnerModel({
            name,
            email,
            password: hashedPassword  ,
            phone,  
            address,
            contactName  
        });
        await foodPartner.save();

        const token = sign({ id: foodPartner._id }, process.env.JWT_SECRET);
        res.cookie('token', token, getCookieOptions());
        res.status(201).json({
            message: 'Food Partner registered successfully',
            token,
            foodPartner: {
                id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
                address: foodPartner.address,
                phone: foodPartner.phone,
                contactName: foodPartner.contactName
            }
        });
    } catch (error) {
        console.error('registerFoodPartner error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//login foodPartner
async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;
        const foodPartner = await foodPartnerModel.findOne({email});
        if(!foodPartner){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await compare(password, foodPartner.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = sign({ id: foodPartner._id }, process.env.JWT_SECRET);
        console.log(foodPartner);
        res.cookie('token', token, getCookieOptions());
        res.status(200).json({
            message: 'Login successful',    
            token,
            foodPartner: {
                id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
                address: foodPartner.address,
                phone: foodPartner.phone,
                contactName: foodPartner.contactName
            }
        });
    } catch (error) {
        console.error('loginFoodPartner error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// logout foodPartner
const logoutFoodPartner = (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };