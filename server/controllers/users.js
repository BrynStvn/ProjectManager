const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

usersRouter.get('/', async (require, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const { username, name, email, rol, password } = request.body
    const authUser = request.user

    if (!password || password.length < 8) {
      return response.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres'
      })
    }

    if (!authUser || authUser.rol !== 'administrador') {
      return response.status(403).json({ error: 'Acceso denegado: solo el administrador puede crear usuarios' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      email,
      rol,
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

usersRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const authUser = request.user
    const user = await User.findById(request.params.id)
    if (!user) {
      return response.status(404).json({ error: 'user not found' })
    }

    if (!authUser || authUser.rol !== 'administrador') {
      return response.status(403).json({ error: 'Acción denegada: solo el administrador puede eliminar empleados' })
    }

    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter