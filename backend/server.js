const express = require('express'); // Express import
const cors = require('cors'); // CORS import
const mongoose = require('mongoose'); // Mongoose import

// Express app
const app = express();

// CORS configuration
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));

// Parse incoming JSON
app.use(express.json());

// Connect to your MongoDB Atlas
// Change "<your-mongodb-atlas-connection-string>" to your own connection
mongoose.connect('mongodb+srv://ssbuilds365:aDLUQJurZa5cvhZa@cluster0.3c5iaoa.mongodb.net/ssbuilds?retryWrites=true&w=majority&appName=Cluster0', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection error!", err));

// Define Schema and Model
const EnquirySchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  phone: { type: String, required: true },
  projectDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

// Model
const Enquiry = mongoose.model('Enquiry', EnquirySchema);

// Create (POST)
app.post('/enquiries', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry successfully saved!', data: enquiry });
  } catch (err) {
    res.status(500).json({ error: 'Error saving!', details: err });
  }
});

// Retrieve (GET)
app.get('/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving!', details: err });
  }
});

// Update (PUT)
app.put('/enquiries/:id', async (req, res) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating!', details: err });
  }
});

// Delete (DELETE)
app.delete('/enquiries/:id', async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enquiry successfully deleted!' });
  } catch (err) {
    res.status(500).json({ error: 'Error!', details: err });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}. http://localhost:${port}`);
});
