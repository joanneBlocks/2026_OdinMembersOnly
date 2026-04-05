const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { errors: [] })
})

router.post('/sign-up', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match')
    }
    return true
  })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('sign-up', { errors: errors.array() })
  }

  try {
    const hashed = await bcrypt.hash(req.body.password, 10)
    await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashed
      }
    })
    res.redirect('/login')
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

router.get('/login', (req, res) => {
  res.render('login', { error: null })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}))

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect('/')
  })
})

module.exports = router