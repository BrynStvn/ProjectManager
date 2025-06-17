import { Navigate, Outlet } from "react-router-dom";

// Simulación de autenticación (reemplazar con lógica real)
const useAuth = () => {
  // Cambia esto por la lógica real de autenticación
  const user = localStorage.getItem("user");
  return !!user;
};

const RutaProtegida = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaProtegida;
