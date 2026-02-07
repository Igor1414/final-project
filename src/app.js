const express = require('express');
const path = require('path');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (HTML)
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/words', require('./routes/wordRoutes'));

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
