// backend/routes/auth.js
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, phonenumber, student } = req.body

    // 🔍 Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // ✅ Create new user
    const user = new User({ firstname, lastname, email, phonenumber, student })
    await user.save()

    res.status(201).json({ message: 'User registered' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message })
  }
})


module.exports = router