const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

const API_KEY = 'sk_nemate_2ewzgXtUnBhdBrmjI2F8vA9cU8yQhllj';
const API_URL = 'https://models.nemate.store/v1/chat/completions';

app.post('/api/proxy', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
