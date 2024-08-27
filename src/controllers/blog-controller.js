const Post = require('../models/post');
const mongoose =  require('mongoose');

const getPosts = (req, res) => {
    Post.find()
    .then((result)=> {
        res.status(200).send(result)
    })
    .catch((err)=> {
        res.status(500).send({error: err})
    })
}

module.exports = {getPosts}