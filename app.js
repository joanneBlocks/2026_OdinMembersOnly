const express = require('express')
const session = require('express-session')
const passport = require('passport')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const flash = require('connect-flash')
require('dotenv').config()

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const clubRouter = require('./routes/club')
const messagesRouter = require('./routes/messages')

const app = express()

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// View engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('layout', 'layout')

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Passport
require('./middleware/passport')
app.use(passport.initialize())
app.use(passport.session())

// Flash
app.use(flash())

// Make currentUser and flash messages available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})

// Routes
app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/', clubRouter)
app.use('/', messagesRouter)

app.listen(3000, () => console.log('Server running on port 3000'))