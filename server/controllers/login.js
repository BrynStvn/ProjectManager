const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({ error: 'Se requieren email y contraseña' })
    }

    const user = await User.findOne({ email })

    const passwordCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false

    if (!user || !passwordCorrect) {
      return response.status(401).json({
        error: 'Email o contraseña incorrectos'
      })
    }

    const userForToken = {
      id: user._id,
      email: user.email,
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 } // 1 hora
    )

    response.status(200).json({
      token,
      email: user.email,
      name: user.name,
      username: user.username // útil si lo usas en el frontend
    })

  } catch (error) {
    next(error) // pasa errores al middleware de manejo de errores
  }
})

module.exports = loginRouter
