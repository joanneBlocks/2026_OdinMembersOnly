const express = require('express')
const router = express.Router()
const prisma = require('../db')

router.get('/new-message', (req, res) => {
  if (!req.user) return res.redirect('/login')
  res.render('new-message', { error: null })
})

router.post('/new-message', async (req, res) => {
  if (!req.user) return res.redirect('/login')

  try {
    await prisma.message.create({
      data: {
        title: req.body.title,
        text: req.body.text,
        authorId: req.user.id
      }
    })
    req.flash('success', 'Your message has been shared with the board 🌸')
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

router.post('/messages/:id/delete', async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send('Forbidden')
  }

  try {
    await prisma.message.delete({
      where: { id: parseInt(req.params.id) }
    })
    req.flash('success', 'Message deleted successfully.')
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

module.exports = router