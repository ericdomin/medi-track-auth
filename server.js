const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const  MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const mediRoutes = require('./routes/medi')
const PORT = process.env.PORT || 3030

require('dotenv').config({path: './config/.env'})
//passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('img'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//SESSIONS
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/medi', mediRoutes)

  // app.use('/', homeRoutes) 
//app.use('/', mediRoutes)
 
app.listen(PORT, ()=>{
    console.log(`Server is running, you better catch it!`)
})    


