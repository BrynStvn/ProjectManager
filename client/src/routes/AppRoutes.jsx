import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";
import Proyectos from "../pages/Proyectos";
import ProyectoDetalle from "../pages/ProyectoDetalle";
import CrearProyecto from "../pages/CrearProyecto";
import Tareas from "../pages/Tareas";
import Perfil from "../pages/Perfil";
import NoEncontrado from "../pages/NoEncontrado";
import RutaProtegida from "../routes/RutaProtegida";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RutaProtegida />}> {/* Rutas protegidas */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectos/crear" element={<CrearProyecto />} />
        <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registro" element={<Registro />} />
      </Route>
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  </Router>
);

export default AppRoutes;
