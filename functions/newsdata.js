const axios = require('axios');
require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

exports.handler = async (event, context, callback) => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: 'Philadelphia',
        from: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
        apiKey: NEWS_API_KEY
      }
    });

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });
  } catch (error) {
    console.error(error);
    callback(error, {
      statusCode: 500,
      body: 'Error fetching news articles'
    });
  }
};
