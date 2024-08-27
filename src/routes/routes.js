const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/products-controller');
const { register, login, logout, sendOrder, getOrders } = require('../controllers/user-controller');
const { getPosts } = require('../controllers/blog-controller');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('hello');
});

router.get('/getAllProducts', getAllProducts);
router.get('/getProduct', getProduct);
router.post('/addProduct', addProduct);
router.patch('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

router.get('/Posts', getPosts);

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout)
router.post('/sendOrder', sendOrder)
router.post('/getOrders', getOrders)

module.exports = router