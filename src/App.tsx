import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./route/routes";
import "./assets/css/style.css"

const App = () => {
  return useRoutes(routes);
};

export default App;
