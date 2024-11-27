const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://your-connection-string-here';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define a schema for the location
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  ipAddress: String,
  timestamp: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route to ensure the server is working
app.get('/', (req, res) => {
  res.send('Hello, world! Server is working fine.');
});

// Route to save location (POST request)
app.post('/location', async (req, res) => {
  try {
    const { latitude, longitude, ipAddress } = req.body;

    console.log(`Received location from IP: ${ipAddress}, Latitude: ${latitude}, Longitude: ${longitude}`);

    // Save to MongoDB
    const location = new Location({ latitude, longitude, ipAddress });
    await location.save();

    res.status(200).json({ message: 'Location saved successfully!' });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).send('Error saving location');
  }
});

// Serve frontend assets (HTML, CSS, JS) when not in development mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
