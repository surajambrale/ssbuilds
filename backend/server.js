const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'http://localhost:4200',
  'ssbuilds.vercel.app'
];

// ✅ CORS config
app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true 
}));

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb+srv://ssbuilds365:aDLUQJurZa5cvhZa@cluster0.3c5iaoa.mongodb.net/ssbuilds?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error!", err));

// ✅ Define Schema and Model
const EnquirySchema = new mongoose.Schema({ 
  name: String,
  phone: String,
  projectDescription: String,
  createdAt: { type: Date, default: Date.now } 
});
const Enquiry = mongoose.model('Enquiry', EnquirySchema);

// ✅ Create a new enquiry (POST)
app.post('/enquiries', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).send({ message: 'Enquiry saved!' });
  } catch (err) {
    res.status(500).send({ error: 'Error saving enquiry' });
  }
});

// ✅ Get all enquiries (GET)
app.get('/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching enquiries' });
  }
});

// ✅ Update an enquiry (PUT)
app.put('/enquiries/:id', async (req, res) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).send({ error: 'Error updating enquiry' });
  }
});

// ✅ Delete an enquiry (DELETE)
app.delete('/enquiries/:id', async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Enquiry deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting enquiry' });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
