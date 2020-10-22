import React, { useContext } from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { Authentication } from "../Authentication/Authentication";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const authContext = useContext(Authentication);

  const history = useHistory();

  return (
    <Card id="login">
      <h4>Login</h4>
      <Formik
        initialValues={{
          Username: "",
          Password: "",
          Submit: null,
        }}
        validationSchema={Yup.object().shape({
          Username: Yup.string()
            .min(10, "Too short")
            .max(50, "Too long")
            .required("Must enter an email"),
          Password: Yup.string()
            .min(8, "Too short")
            .max(50, "Too long")
            .required("Must enter a password"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await authContext.login(values.Username, values.Password);
            history.push("/Anime");
            console.log(values.Username, values.Password);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              id="outlined-basic"
              name="Username"
              className="textfield"
              label="UserName"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Username}
              required
              error={Boolean(touched.Username && errors.Username)}
              helpertext={touched.Username && errors.Username}
            />
            <TextField
              id="outlined-basic"
              name="Password"
              className="textfield"
              label="Password"
              variant="outlined"
              value={values.Password}
              onBlur={handleBlur}
              error={Boolean(touched.Password && errors.Password)}
              helpertext={touched.Password && errors.Password}
              onChange={handleChange}
              required
            />
            <Button
              className="button"
              variant="contained"
              disabled={errors.Username || errors.Password}
              type="Submit"
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default Login;
