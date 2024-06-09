const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {            //eita frontend run request aniba
  const { name, email, password, role } = req.body;     //values catch hauchi and store in the fields defined
  try {
    let user = await User.findOne({ email });      //findone hauchi inbuilt method access dtabae for getting one record
    if (user) {
      return res.status(400).json({ message: 'User already exists' });      //checking if user mail already exist 400 for not found
    }

    user = new User({ name, email, password, role });       //creating new user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();                          //saving data to database
    res.status(201).json({ message: 'User registered successfully' });      //status code 201 means success 
  } catch (err) {
    res.status(500).json({ message: 'Server error' });      //if dtabase not found then 500 error
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, role: user.role }); // Include role in the response
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
