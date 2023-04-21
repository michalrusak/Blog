import React from "react";

import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

import "./styles/main.scss";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";
import UserEdit from "./pages/UserEdit";
import Logout from "./pages/Logout";
import AddArticle from "./pages/AddArticle";

function App() {
  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      localStorage.removeItem("token");
      // navigate("/login");
    }
  }, []);

  // const anon = () => {
  //   return <p>Anon</p>;
  // };

  // const logged = () => {
  //   return <p>logged</p>;
  // };

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserEdit />} />
        <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

