const axios = require('axios');
require('dotenv').config();

const NEWS_API_KEY = 'a9c4518d12994ccba3d6ef5a8ed65b16'
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

    const articles = response.data.articles.map(article => ({
      title: article.title,
      publishedAt: article.publishedAt,
      content: article.content
    }));

    callback(null, {
      headers: {
        'Access-Control-Allow-Origin': 'https://galiconewsapi.netlify.app/api/newsdata',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      statusCode: 200,
      body: JSON.stringify(articles)
    });
  } catch (error) {
    console.error(error);
    callback(error, {
      headers: {
        'Access-Control-Allow-Origin': 'https://galiconewsapi.netlify.app/api/newsdata',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      statusCode: 500,
      body: 'Error fetching news articles'
    });
  }
};
