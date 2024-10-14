// Import the required modules using import syntax
import express from 'express';
const app = express();
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
try{
   let today = new Date();
   const month = today.getMonth() + 1; // Months are zero-indexed in JavaScript
   const day = today.getDate();

   const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo', // or gpt-4 if you have access
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that provides historical facts.',
        },
        {
          role: 'user',
          content: `Tell me important historical events that happened on ${month}/${day}.`,
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  const chatGPTResponse = response.data.choices[0].message.content;
  res.send(chatGPTResponse);
} catch (error) {
    console.error('Error fetching data from ChatGPT API:', error);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(3000, () => {
   console.log('server started');
});