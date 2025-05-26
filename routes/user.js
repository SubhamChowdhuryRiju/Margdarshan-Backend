const express = require('express');
const User = require('../models/user');
const userValidationSchema = require('../schemas/user');

const router = express.Router();

// Create user
router.post('/create', async (req, res) => {
  try {
    const {error} = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find({});
      
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json({
        message: 'Users fetched successfully',
        users: users
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = {
  path: "/user",
  router,
};