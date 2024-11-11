// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: () => new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
    },
});

module.exports = mongoose.model('Todo', todoSchema);
