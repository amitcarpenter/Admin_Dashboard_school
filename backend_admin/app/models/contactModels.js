const mongoose = require('mongoose');

// Define the schema for the form fields
const FormSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  bgImage: {
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
