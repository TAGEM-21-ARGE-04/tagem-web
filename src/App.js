import { Routes } from "Routes";
import { BrowserRouter, useRoutes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

const Router = () => {
  return useRoutes(Routes);
};

export default App;
