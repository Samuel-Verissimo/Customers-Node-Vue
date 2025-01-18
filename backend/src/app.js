const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDB } = require('./config/db');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.use('/api/v1/clients', clientRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend is running on internal port ${PORT} and external port 3001`);
  });
}).catch(err => {
  console.error('Error initializing DB:', err);
});
