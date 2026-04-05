const express = require('express')
const router = express.Router()
const prisma = require('../db')

router.get('/join-club', (req, res) => {
  if (!req.user) return res.redirect('/login')
  res.render('join-club', { error: null })
})

router.post('/join-club', async (req, res) => {
  if (!req.user) return res.redirect('/login')

  if (req.body.passcode === process.env.CLUB_PASSCODE) {
    try {
      await prisma.user.update({
        where: { id: req.user.id },
        data: { isMember: true }
      })
      req.flash('success', 'Welcome to the circle, Radiant! 🌸')
      res.redirect('/')
    } catch (err) {
      console.error(err)
      res.status(500).send('Something went wrong')
    }
  } else {
    req.flash('error', 'Wrong passcode, try again!')
    res.redirect('/join-club')
  }
})

module.exports = router