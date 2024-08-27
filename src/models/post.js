const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
});

const Post = mongoose.model('Post', Schema)
module.exports = Post