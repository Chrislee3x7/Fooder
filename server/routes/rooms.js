const express = require('express');

const router = express.Router();

// Create Exercise
router.post('/create', async (req, res) => {
  try {
    

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
