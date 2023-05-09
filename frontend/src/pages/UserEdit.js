import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserEdit = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      getUser(token);
    }
  }, []);

  const getUser = (token) => {
    axios
      .get("/user/user", {
        headers: {
          "x-access-token": token,
        },
      })
      .then(function (res) {
        const { firstname, lastname, email } = res.data;
        setUserInfo({ firstname, lastname, email, password: "" });
      })
      .catch(function (error) {
        console.log(error.response.status);

        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  const deleteAccount = () => {
    console.log("delete account");
    const token = localStorage.getItem("token");

    axios
      .delete("/user/user", {
        headers: {
          "x-access-token": token,
        },
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error.response.status);

        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  return (
    <>
      <div className="user">
        <p className="user__text">Information:</p>
        <p className="user__text">
          {userInfo.firstname} {userInfo.lastname}
        </p>
        <p className="user__text">{userInfo.email}</p>
        <button className="user__button" onClick={deleteAccount}>
          Delete account
        </button>
      </div>
    </>
  );
};

export default UserEdit;
