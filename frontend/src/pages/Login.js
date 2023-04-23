import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {} from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required("Email required!")
      .email("Email is incorrect!"),

    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Min 8 char!")
      .max(20, "Max 20 char!"),
  });

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Blog App";
  });

  const sendLoginForm = (values) => {
    console.log(values);

    axios
      .post("/user/login", {
        email: values.email,
        password: values.password,
      })
      .then(function (res) {
        console.log(res);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          alert("Login successful");
          // window.location.href = "/info";
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          alert("Account does not exist!");
        }
      });
  };
  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          sendLoginForm(values);
        }}
      >
        {({ errors, touched }) => (
          <Form action="" className="login__form">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="login__input"
              placeholder="xyz@mail.com"
            />
            {errors.email && touched.email ? (
              <div className="login__error">{errors.email}</div>
            ) : null}
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="login__input"
              placeholder="********"
            />
            {errors.password && touched.password ? (
              <div className="login__error">{errors.password}</div>
            ) : null}
            <Field
              type="submit"
              value="Login"
              className="login__submit"
              id="login__button"
            />
            <p className="login__question">You don`t have an account?</p>
            <a href="/register" className="login__redirect">
              Register
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
