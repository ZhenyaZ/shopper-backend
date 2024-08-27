const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./src/routes/routes')
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
require('dotenv').config()
mongoose
.connect(process.env.DB_URL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err))

app.use('/api', router);

app.listen(process.env.PORT, () => console.log('server running on port ' + process.env.PORT))


