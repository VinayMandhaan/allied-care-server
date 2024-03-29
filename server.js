const express = require('express')
const connectDB = require('./config/db')
var cors = require('cors')
const path  = require('path')
const app = express();

const engines = require("consolidate");


app.engine('ejs', require('ejs').__express)
app.set("views", path.join(__dirname,'templates'))
app.set("view engine", "ejs");

connectDB();

const PORT = process.env.PORT || 5000

app.use(express.json({
    extended: false
}))
app.use(cors())

app.get('/',(req,res)=>{
    res.send('API Running')
})

app.use('/api/user',require('./routes/api/user'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/disease',require('./routes/api/disease'))
app.use('/api/payment',require('./routes/api/payment'))

app.listen(PORT, ()=>{
    console.log(`Server Started on Port ${PORT}`)
})