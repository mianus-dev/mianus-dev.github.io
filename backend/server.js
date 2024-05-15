const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model
const personSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  native_name: String,
  title: String
});

const Person = mongoose.model('Person', personSchema);

// Define routes
app.post('/api/persons', async (req, res) => {
  const newPerson = new Person(req.body);
  try {
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
