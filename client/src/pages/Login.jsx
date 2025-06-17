import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "El correo es obligatorio.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Enviar datos:", { email, password });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
