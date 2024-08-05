import React from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Importa useLocation
import ProjectList from "../ProjectList";
import TaskTable from "../TaskTable";
import Login from "../Login";
import NavBar from "../NavBar"; // Asegúrate de importar el componente NavBar

const Main = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual

  const error = () => <div>Error</div>;

  return (
    <>
      {/* Renderiza el NavBar solo si no estás en la página de inicio de sesión */}
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/projects" Component={ProjectList} />
        <Route path="/tasks/:projectID" Component={TaskTable} />
        <Route render={error} />
      </Routes>
    </>
  );
}

export default Main;
