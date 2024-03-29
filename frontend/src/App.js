import React from "react";

import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import "./styles/main.scss";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";
import UserEdit from "./pages/UserEdit";
import Logout from "./pages/Logout";
import AddArticle from "./pages/AddArticle";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    setToken(localStorage.getItem("token"));

    if (!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      setToken("");
    }
  };

  const resetToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="container">
      <nav className="navbar">
        <NavLink className="navbar__navlink" to="/">
          Articles
        </NavLink>

        {token ? (
          <>
            <NavLink className="navbar__navlink" to="/logout">
              Logout
            </NavLink>

            <NavLink className="navbar__navlink" to="/user">
              User
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="navbar__navlink" to="/login">
              Log in
            </NavLink>

            <NavLink className="navbar__navlink" to="/register">
              Sign up
            </NavLink>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/login" element={<Login getToken={getToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserEdit />} />
        <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/logout" element={<Logout reset={resetToken} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
