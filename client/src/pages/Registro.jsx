import { useState } from "react"
import registerService from "../services/register"
import Menu from '../components/Menu'

const Registro = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    rol: "",
    password: ""
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [success, setSuccess] = useState(false)

  // Obtiene el token del usuario logueado (admin)
  const getToken = () => {
    const userJSON = window.localStorage.getItem("user")
    if (!userJSON) return null
    try {
      const user = JSON.parse(userJSON)
      return user.token
    } catch {
      return null
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const validate = () => {
    const newErrors = {}
    if (!form.username || form.username.length < 3)
      newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres."
    if (!form.name || form.name.length < 3)
      newErrors.name = "El nombre debe tener al menos 3 caracteres."
    if (!form.email || form.email.length < 5)
      newErrors.email = "El correo debe tener al menos 5 caracteres."
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(form.email))
      newErrors.email = "Por favor, proporciona un correo válido."
    if (!form.rol) {
      newErrors.rol = "Debes seleccionar un rol."
    }
    if (!form.password || form.password.length < 8)
      newErrors.password = "La contraseña debe tener al menos 8 caracteres."
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError("")
    setSuccess(false)
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      const token = getToken()
      if (!token) {
        setApiError("Debes iniciar sesión como administrador para registrar usuarios.")
        return
      }
      try {
        registerService.setToken(token)
        await registerService.register(form)
        setSuccess(true)
        setForm({
          username: "",
          name: "",
          email: "",
          rol: "",
          password: ""
        })
      } catch (error) {
        setApiError(
          error.response?.data?.error || "Error al registrar. Intenta de nuevo."
        )
      }
    }
  }

  return (
    <div>
      <Menu />
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        {success && <p style={{ color: "green" }}>¡Registro exitoso!</p>}
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label>Nombre completo</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Rol</label>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Admin</option>
            <option value="project_manager">Project Manager</option>
            <option value="team_member">Team Member</option>
            <option value="client">Client</option>
            <option value="qa_tester">QA Tester</option>
          </select>
          {errors.rol && <p>{errors.rol}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default Registro
