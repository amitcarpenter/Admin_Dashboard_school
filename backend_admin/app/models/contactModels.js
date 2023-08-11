const mongoose = require('mongoose');

// Define the schema for the form fields
const FormSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// Create the model
const Contact = mongoose.model('Contact', FormSchema);

module.exports = Contact;
