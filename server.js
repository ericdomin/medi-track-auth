const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const mediRoutes = require('./routes/medi')

require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('img'))
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use('/', homeRoutes) 
app.use('/', mediRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on 2121, you better catch it!`)
})    


