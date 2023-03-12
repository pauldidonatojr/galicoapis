const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const NEWS_API_KEY = 'a9c4518d12994ccba3d6ef5a8ed65b16'
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

app.get('/news/philadelphia', async (req, res) => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: 'Philadelphia',
        from: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
        apiKey: NEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching news articles');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
