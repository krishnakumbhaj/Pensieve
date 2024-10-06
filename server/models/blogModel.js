const mongoose = require('mongoose');
const User = require('./userModel'); // Import the userModel.js

const blogSchema = new mongoose.Schema({
            title: {
                        type: String,
                        required: true
            },
            content: {
                        type: String,
                        required: true
            },
            author: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User', // Reference the User model
                        required: true
            },
            createdAt: {
                        type: Date,
                        default: Date.now
            },
            updatedAt: {
                        type: Date,
                        default: Date.now
            }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
