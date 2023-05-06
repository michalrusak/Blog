import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserEdit = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));

    if (!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);
  return <h1>user {token}</h1>;
};

export default UserEdit;
