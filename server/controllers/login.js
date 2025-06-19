const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body

    if (!username || !password) {
      return response.status(400).json({ error: 'Se requieren username y contraseña' })
    }

    const user = await User.findOne({ username })

    const passwordCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false

    if (!user || !passwordCorrect) {
      return response.status(401).json({
        error: 'username o contraseña incorrectos'
      })
    }

    const userForToken = {
      id: user._id,
      username: user.username,
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 } // 1 hora
    )

    response.status(200).json({
      token,
      username: user.username,
      name: user.name,
      email: user.email, // útil si lo usas en el frontend
      rol: user.rol
    })

  } catch (error) {
    next(error) // pasa errores al middleware de manejo de errores
  }
})

module.exports = loginRouter
