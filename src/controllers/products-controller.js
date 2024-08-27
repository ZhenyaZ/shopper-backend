const Product = require('../models/product');
const mongoose =  require('mongoose');

const getAllProducts = (req, res) => {
    Product
    .find()
    .then(products=>{
        res.status(200).send(products)
    })
    .catch(err=>{
        res.status(500).send({error: err})
    })
}
const getProduct = (req, res) => {
    Product.find().limit(1).then(products=>{
        res.status(200).send(products)
    }).catch(err=>{
        res.status(500).send({error: err})
    })
}
const addProduct = (req, res) => {
    const product = new Product(req.body);
    product.save().then((result)=>{
        res.status(201).send(result)
    }).catch((err)=>{
        res.status(500).send({error: err})
    })
}
const updateProduct = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    Product.findOneAndUpdate(id, req.body)
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        res.status(500).send({error: err})
    })
}
const deleteProduct = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    Product.findOneAndDelete(id)
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        res.status(500).send({error: err})
    })
}

module.exports = {
    getAllProducts, addProduct, updateProduct, deleteProduct, getProduct
}