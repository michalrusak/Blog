import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {} from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArticleSchema = () =>
  yup.object().shape({
    title: yup.string().required("Title required!"),

    body: yup.string().required("Body is required!").max(200, "Max 200 char!"),
  });

const AddArticle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add article | Blog App";

    if (!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  const sendArticleForm = async (values) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "/article/newarticle",
        {
          title: values.title,
          text: values.body,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then(function (res) {
        console.log(res);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="addarticle">
      <h1 className="addarticle__title">Add article</h1>

      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        validationSchema={ArticleSchema}
        onSubmit={(values) => {
          sendArticleForm(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="addarticle__form">
            <label htmlFor="title" className="addarticle__label">
              Title
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              className="addarticle__input"
              placeholder="title"
            />
            {errors.title && touched.title ? (
              <div className="addarticle__error">{errors.title}</div>
            ) : null}
            <label htmlFor="body" className="addarticle__label">
              body
            </label>
            <Field
              as="textarea"
              type="text"
              name="body"
              id="body"
              className="addarticle__input addarticle__input--body"
              placeholder="body"
            />
            {errors.body && touched.body ? (
              <div className="addarticle__error">{errors.body}</div>
            ) : null}
            <Field
              type="submit"
              value="Add article"
              className="addarticle__submit"
              id="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddArticle;
