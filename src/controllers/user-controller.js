const {User, UserOrder} = require('../models/users');
const bcrypt = require('bcrypt');
const JWTCreate = require('../utils/JWTCreate');
const JWTValidate = require('../utils/JWTValidate');
const crypto = require('crypto');

const register = async (req, res) => {
    try {
       const data = req.body;
       const userExist = await User.findOne({login: data.login})
       if(data !== undefined && userExist === null){
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const token = JWTCreate(data)
        const user = new User({
            login: data.login,
            name: data.name,
            password: hashedPassword,
            email: data.email,
            token: token
        })
        user
        .save()
        .then(()=>{
            res.status(200).send({message: `user ${data.login} registered, please SignIn`})
        })
        .catch((err)=>{
            res.status(500).send({message: err})
        })
    }
    else{
        res.status(404).send({message: 'User already exists'})
    }
    } catch (message) {
        res.status(500).send({message: 'Something went wrong'})
    }
}

const login = async (req, res) => {
    try{
        const data = req.body;
        const user = await User.findOne({login: data.login})
        if(user){
            const decryptedPassword = await bcrypt.compare(data.password, user.password);
            const validateToken = JWTValidate(user.token)
            if(decryptedPassword && validateToken){
                await res.cookie('token', user.token, {httpOnly: true, secure: true, sameSite: 'strict'})
                await res.status(200).send({message: `user ${data.login} logged in`, data: {_id: user._id,login: user.login, name: user.name, email: user.email}})
            }else{
                res.status(401).send({message: 'invalid credentials'})
            }
        }else{
            res.status(404).send({message: 'user not found'})
        }
    }catch(message){
        res.status(500).send({message: 'Something went wrong'})
    }
}

const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).send({message: 'user logged out'})
}

const sendOrder = async (req, res) => {
    const orderID = crypto.randomBytes(16).toString('hex');
    await UserOrder.insertMany({
        orderID: orderID,
        userID: req.body.userID,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        zip: req.body.zip,
        products: req.body.products,
        total: req.body.total
    })
    res.status(200).send({message: 'order sent', orderID: orderID})
}
const getOrders = async (req, res) => {
    const orders = await UserOrder.find({userID: req.body.data._id})
    
    res.status(200).send({message: 'orders fetched', orders: orders})
}
module.exports = {
    register, login, logout, sendOrder, getOrders
}