// Import Dependencies
import React, { useState } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  // Declare a variable holding the default empty data
  const defaultUserData = { username: "", password: "" };
  const dispatch = useDispatch();
  const { push } = useHistory();
  // Get the state to hold the form data
  const [user, setUser] = useState(defaultUserData);

  // Set the state for the errors for validation
  const [errors, setErrors] = useState({});

  // Set state for to disable submit button
  const [disableSubmit, setDisableSubmit] = useState(false);

  // Function to handle the text field change to set to the user state
  const handleChange = (e) => {
    const userData = { ...user, [e.target.name]: e.target.value };

    setUser(userData);
  };

  // Form schema to be used for form validation
  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password."),
  });

  // Form to catch any errors if the form did not validated
  const formErrors = (e) => {
    // Make a copy of the errors state
    let allErrors = { ...errors };

    // Cycle through all data and check
    for (const userData in user) {
      yup
        .reach(formSchema, userData)
        .validate(user[userData])
        .then((valid) => {
          allErrors[`${userData}`] = "";
        })
        .catch((err) => {
          allErrors[`${userData}`] = err.errors[0];
        });
    }

    // Set the errors into the state
    setErrors(allErrors);
  };

  // Function to handle the form submission
  const handleSubmission = (e) => {
    e.preventDefault();
    // POST request
    dispatch({ type: "LOGGING_IN" });
    axiosWithAuth()
      .post("/auth/login", user)
      .then((res) => {
        // Check response data for what to setItem to below
        console.log(res.data);
        dispatch({ type: "LOGGING_SUCCESS", payload: res.data.user });
        localStorage.setItem("token", res.data.token);
        push("/classes");
      })
      .catch((err) => console.log("err", err.message));
    // Check for errors first
    formErrors();

    // Check if the form passes the validation
    formSchema.isValid(user).then((valid) => {
      console.log("is my form valid?", valid);

      if (valid) {
        // Ensure to eliminate all errors if form is valid
        setErrors({});

        // Submit the form
        console.log("Form submitted", user);

        // Clear the form
        setUser(defaultUserData);
      } else {
        // Disable the submit button while the animation plays
        setDisableSubmit(true);

        setTimeout(() => {
          setDisableSubmit(false);
        }, 1000);
      }
    });
  };

  return (
    <div className="form-container">
      <h3>Login Form</h3>

      <form onSubmit={handleSubmission}>
        <label
          htmlFor="username"
          className={`${
            errors.username !== "" && errors.username !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Username
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>

        <label
          htmlFor="password"
          className={`${
            errors.password !== "" && errors.password !== undefined
              ? "invalid"
              : "valid"
          }`}
        >
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Log in" disabled={disableSubmit} />
      </form>

      {Object.keys(errors).length > 0 && (
        <div className="errors">
          {Object.keys(errors).map((key) => (
            <p value={key} key={key}>
              {errors[key]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
