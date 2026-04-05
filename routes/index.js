const express = require('express')
const router = express.Router()
const prisma = require('../db')

router.get('/', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    })

    // Never send passwords to the frontend
    const safeMessages = messages.map(msg => ({
      id: msg.id,
      title: msg.title,
      text: msg.text,
      createdAt: msg.createdAt,
      author: {
        firstName: msg.author.firstName,
        lastName: msg.author.lastName
      }
    }))

    // Sanitize currentUser too
    const safeUser = req.user ? {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isMember: req.user.isMember,
      isAdmin: req.user.isAdmin
    } : null

    res.render('index', { messages: safeMessages, safeUser })
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

module.exports = router