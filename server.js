const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://YOUR_DB_URI_HERE';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define a schema for the location
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  ipAddress: String, // Field to store IP address
  timestamp: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);

// Root route to ensure the server is running
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

    res.status(200).send('Location saved');
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).send('Error saving location');
  }
});

// Route to fetch all saved locations (GET request)
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();  // Retrieve all saved locations
    res.json(locations);  // Send the locations as a JSON response
  } catch (error) {
    console.error('Error retrieving locations:', error);
    res.status(500).send('Error retrieving locations');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
