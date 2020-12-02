import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Card, TextField, Button } from "@material-ui/core";

import { Authentication } from "../../Authentication/Authentication";

const SignUp = () => {
  const authContext = useContext(Authentication);
  const history = useHistory();
  const { createUserWithEmailAndPassword, signInWithGoogle } = authContext;

  const handleGoogleClick = async () => {
    try {
      await signInWithGoogle();
      history.push("/Search");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card id="login">
      <h4>Sign Up</h4>
      <Card>
        <Formik
          initialValues={{
            Email: "",
            Password: "",
            Submit: null,
          }}
          validationSchema={Yup.object().shape({
            Email: Yup.string()
              .min(10, "Too short")
              .max(50, "Too long")
              .required("Must enter an email"),
            Password: Yup.string()
              .min(8, "Too short")
              .max(50, "Too long")
              .required("Must enter a password"),
            Favorite: Yup.string().min(4, "Too Short").max(100, "Too Long"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await createUserWithEmailAndPassword(
                values.Email,
                values.Password
              );
              authContext.favorteHandler(values.Favorite);
              history.push("/Search");
              console.log(values.Email, values.Email);
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
                name="Email"
                className="textfield"
                label="Email"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Email}
                required
                error={Boolean(touched.Email && errors.Email)}
                helpertext={touched.Email && errors.Email}
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
              <TextField
                id="outlined-basic"
                name="Favorite"
                className="textfield"
                label="Favorite Anime"
                variant="outlined"
                value={values.Favorite}
                onBlur={handleBlur}
                error={Boolean(touched.Favorite && errors.Favorite)}
                helpertext={touched.Favorte && errors.Password}
                onChange={handleChange}
              />
              <Button
                className="button"
                variant="contained"
                disabled={errors.Username || errors.Password}
                type="Submit"
              >
                Sign Up
              </Button>
            </form>
          )}
        </Formik>
      </Card>
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="contained"
      >
        Sign in With Google
      </Button>
    </Card>
  );
};
export default SignUp;
