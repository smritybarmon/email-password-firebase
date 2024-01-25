import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./Components/Layout/Main.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import RegisterRBS from "./Components/RegisterRBS/RegisterRBS.jsx";
import RegisterBS from "./Components/RegisterBS/RegisterBS.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/register-rbs",
        element: <RegisterRBS></RegisterRBS>,
      },
      {
        path: "/register-bs",
        element: <RegisterBS></RegisterBS>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
