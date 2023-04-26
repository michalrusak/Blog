import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Logout | Blog App";
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <div className="logout">
      <h1 className="logout__title">Logout succes!</h1>
      <p className="logout__text">You will navigate to home page!</p>
    </div>
  );
};

export default Logout;
