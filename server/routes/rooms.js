const express = require('express');
const mongoose = require('mongoose');
const Room = require('../models/Room');
const User = require('../models/User');

const router = express.Router();

// Create Room
router.post('/create', async (req, res) => {
  try {
    let roomCode = "";
    for(let i=0; i<4; i++) {
      roomCode += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    
    let room = new Room({
      roomCode: roomCode
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

// Get the room and all users in the room
router.get('/:roomCode', async (req, res) => {
  const roomCode = req.params.roomCode;

  try {
      const room = await Room.findOne({ code: roomCode }).populate('users').exec();
      if (!room) {
          return res.status(404).send('Room not found');
      }

      res.status(200).json(room);
  } catch (error) {
      res.status(500).send('Server error');
  }
});

router.post('/join', async (req, res) => {
  const { roomCode, userId } = req.body;

  try {
      // Validate that the user exists
      const userExists = await User.findById(userId);
      if (!userExists) {
          return res.status(404).send('User not found');
      }

      
      // Find the room and add the user to it
      const room = await Room.findOne({ roomCode: roomCode });
      if (!room) {
        return res.status(404).send('Room not found');
      }
      

      const userObjectId = new mongoose.Types.ObjectId(userId);

      // Check if the user is already in the room, then update both room and user
      if (!room.users.includes(userObjectId)) {
          room.users.push(userObjectId);
          await room.save();

          userExists.roomCode = roomCode;
          await userExists.save();

          res.status(200).send('User added to room');
      } else {
          res.status(400).send('User already in room');
      }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
