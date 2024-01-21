require('dotenv').config();
const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const router = express.Router();

// Grab restaurants
const YELP_API_BUSINESS_INFO = 'https://api.yelp.com/v3/businesses/';

router.post('/question', async (req, res) => {
  try {
    const { businessIds } = req.body;

    const restaurantInfoString = [];

    for (let id of businessIds) {
      // Make a request to the Yelp API
      const response = await axios.get(YELP_API_BUSINESS_INFO + id, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        }
      });

      let categoryArr = [];
      response.data.categories.forEach((item) => {
        categoryArr.push(item.title);
      })
      const categoryString = categoryArr.join(", ");

      // Grab the reviews for a restaurant
      const reviews = await axios.get(YELP_API_BUSINESS_INFO + id + "/reviews", {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        }
      });

      let reviewArr = [];
      reviews.data.reviews.forEach((item) => {
        reviewArr.push("-" + item.text);
      })
      const reviewString = reviewArr.join("\n");

      const restaurant = `${response.data.name}: This restaurant falls under the categories of ${categoryString}.\nHere are some of its reviews. Please only consider the reviews about the food found here:\n\n${reviewString} `;

      restaurantInfoString.push(restaurant);

    }

    const systemPrompt = "You are an expert in evaluating restaurants. You will help the user narrow down the list of restaurants they provide down to about one-third of its size. This means that if there are 20 restaurants, narrow it down to around 6-7 restaurants. If there are 10 restaurants, narrow it down to around 3-4 restaurants. If there are 5 restaurants, narrow it down to around 1-2 restaurants. You will do this by asking an appropriate amount of clear yes or no questions. Ensure that the questions are related to the restaurants described, but not specific to the restaurants provided. This means that restaurants or restaurant-specific dishes should not be mentioned. Return only the questions with each separated by a newline. The formatting is important so that your response can be worked with in code. You must maintain this formatting. An example of correct formatting is: Are you hungry?\nDo you want food?\nDo you feel thirsty?";
    const userPrompt = restaurantInfoString.join("\n\n");
    
    const gptResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      model: "gpt-4"
    });
    
    const questions = gptResponse.choices[0].message.content.split("\n");

    const finalResponse = {
      originalPrompt: {
        user: userPrompt,
        assistant: gptResponse.choices[0].message.content
      },
      response: questions
    }

    return res.status(200).json(finalResponse);
    
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/answer', async (req, res) => {
  try {
    const { answers, userPrompt, assistantPrompt } = req.body;

    const systemPrompt = "You just helped the user narrow down their selection of restaurants by asking them yes or no questions. Now, they have responded to those questions and you will narrow down their restaurant options based on the answers to those questions. If the user gives contradicting answers, or it is hard to narrow down the restaurant list, try your best to eliminate some choices at least.g Return only the remaining restaurants, with each restaurant name separated by a newline. You must maintain this formatting. An example of correct formatting is: Restaurant 1\nRestaurant 2\nRestaurant 3"
    const answersString = answers.join("\n");

    const gptResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        },
        {
          role: "assistant",
          content: assistantPrompt
        },
        {
          role: "user",
          content: answersString
        }

      ],
      model: "gpt-4"
    });
    
    const finalResponse = gptResponse.choices[0].message.content.split("\n")

    return res.status(200).json(finalResponse);
    
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
