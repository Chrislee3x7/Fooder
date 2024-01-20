const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create User
router.post('/create', async (req, res) => {
  try {
    let user = new User();
    await user.save();

    if (!user) {
      return res.status(401).json('User creation failed');
    }

    console.log(`User created with Id ${user._id}`)
    return res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
