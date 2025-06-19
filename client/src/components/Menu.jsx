import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: 16 }}>Dashboard</Link>
      <Link to="/proyectos" style={{ marginRight: 16 }}>Proyectos</Link>
      <Link to="/proyectos/crear" style={{ marginRight: 16 }}>Crear Proyecto</Link>
      <Link to="/tareas" style={{ marginRight: 16 }}>Tareas</Link>
      <Link to="/perfil" style={{ marginRight: 16 }}>Perfil</Link>
      <Link to="/registro" style={{ marginRight: 16 }}>Equipo</Link>
      <button onClick={() => {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }} style={{ marginLeft: 16 }}>
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Menu;
