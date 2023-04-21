import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Not found page! | Blog App";
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <div>
      <h1>Page is not found!</h1>
      <p>You will navigate to home page!</p>
    </div>
  );
};

export default NotFound;
