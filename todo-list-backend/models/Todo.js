const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Default value is false (not completed)
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the date to the current time if not provided
  },
});

module.exports = mongoose.model('Todo', todoSchema);
