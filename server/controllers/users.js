const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, email, password } = request.body

    if (!password || password.length < 8) {
      return response.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      email,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

  } catch (error) {
    // Si el error es por clave duplicada (unique)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return response.status(400).json({ error: 'El usuario o correo ya está registrado' })
    }

    // Si hay errores de validación
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

    // Para otros errores no esperados
    next(error)
  }
})

module.exports = usersRouter