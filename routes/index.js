const express = require('express')
const router = express.Router()
const prisma = require('../db')

router.get('/', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    })
    res.render('index', { messages })
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }
})

module.exports = router