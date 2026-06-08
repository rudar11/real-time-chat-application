const usermodel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { email, name, password } = req.body;

        const isExists = await usermodel.findOne({ email });
        if (isExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await usermodel.create({ email, name, password: hash });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        
      
        res.status(201).json({ 
            message: "User created successfully", 
            user: { 
                _id: user._id,
                name: user.name, 
                email: user.email 
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' 
        });

        // Yahan _id add kar diya hai
        res.status(200).json({ 
            message: "Logged in successfully", 
            user: { 
                _id: user._id, 
                name: user.name, 
                email: user.email 
            }, 
            token 
        });
        
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
}
module.exports = { registerUser, loginUser };