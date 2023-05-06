import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign Up | Blog App";
  });

  const sendRegisterForm = (values) => {
    axios
      .post("/user/register", {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
      })
      .then(function (res) {
        console.log(res);
        alert("You have created an account!");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(values);
  };

  return (
    <div className="register">
      <h1 className="register__title">Sign up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          sendRegisterForm(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="register__form">
            <label htmlFor="firstname" className="register__label">
              Firstname
            </label>
            <Field
              name="firstName"
              id="firstname"
              className="register__input"
              placeholder="Firstname"
            />
            {errors.firstName && touched.firstName ? (
              <div className="register__error">{errors.firstName}</div>
            ) : null}
            <label htmlFor="lastname" className="register__label">
              Lastname
            </label>
            <Field
              name="lastName"
              id="lastname"
              className="register__input"
              placeholder="Lastname"
            />
            {errors.lastName && touched.lastName ? (
              <div className="register__error">{errors.lastName}</div>
            ) : null}
            <label htmlFor="email" className="register__label">
              Email
            </label>
            <Field
              name="email"
              type="email"
              id="email"
              className="register__input"
              placeholder="xyz@mail.com"
            />
            {errors.email && touched.email ? (
              <div className="register__error">{errors.email}</div>
            ) : null}
            <label htmlFor="password" className="register__label">
              Password
            </label>
            <Field
              name="password"
              type="password"
              id="password"
              className="register__input"
              placeholder="********"
            />
            {errors.password && touched.password ? (
              <div className="register__error">{errors.password}</div>
            ) : null}

            <Field
              type="submit"
              value="Sign Up"
              className="register__submit"
              id="register__button"
            />

            <p className="register__question">Have you an account?</p>
            <a href="/login" className="register__redirect">
              Log In
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
