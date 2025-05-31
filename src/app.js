const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');

app.use(express.json());
app.use('/books', bookRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

module.exports = app;
