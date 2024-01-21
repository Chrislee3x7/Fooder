require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();

// Grab restaurants
const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';
router.post('/restaurants', async (req, res) => {
  try {
    const { longitude, latitude, prices, radius } = req.body;

    // Make a request to the Yelp API
    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        categories: ['restaurants'],
        price: prices,
        open_now: true,
        limit: 8
      }
    });

    const data_cleaned = [];
    response.data.businesses.forEach((item) => {
      data_cleaned.push({"id": item.id , "name" :item.name});
    })

    // Send back the list of restaurants
    return res.status(200).json(data_cleaned);

  } catch (error) {
    console.error('Error fetching data from Yelp API:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
