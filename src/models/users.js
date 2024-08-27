const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    token: {type: String, required: true},
})
const userOrderSchema = new Schema({
    orderID: {type: String, required: true},
    userID: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address : {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    zip: {type: String, required: true},
    products: {type: Array, required: true},
    total: {type: Number, required: true},
})
const User = mongoose.model('User', userSchema);
const UserOrder = mongoose.model('Orders', userOrderSchema);
module.exports = {User, UserOrder}