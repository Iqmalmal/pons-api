const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/translate', async (req, res) => {
  const { q, l } = req.query;
  try {
    const response = await axios.get('https://api.pons.com/v1/dictionary', {
      headers: {
        'X-Secret': process.env.PONS_SECRET
      },
      params: { q, l }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error response from PONS:', err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.message,
      details: err.response?.data || 'No additional info'
    });
  }

  console.log('Secret:', process.env.PONS_SECRET ? 'Loaded' : 'Missing');

});




app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
