const express = require('express');
const Room = require('../models/Room');

const router = express.Router();

// Create Exercise
router.post('/create', async (req, res) => {
  try {
    let code = "";
    for(let i=0; i<4; i++) {
      code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    
    let room = new Room({
      code: code
    });
    
    await room.save();

    if (!room) {
      return res.status(401).json('Duplicate code accidentally generated, please try again!');
    }

    console.log(`Room created with code ${code}`)
    return res.status(200).json(room);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
