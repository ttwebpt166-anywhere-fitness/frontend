import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import * as yup from "yup";

const ClientRegisterForm = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    zipcode: "",
    createUsername: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [formIsValid, setFormValid] = useState(false);
  const clientRegisterSchema = yup.object().shape({
    username: yup.string().required("Create a username to login!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be 6 chars long"),
    confirmPassword: yup
      .string()
      .required("Please reenter your password to confirm!"),
    terms: yup
      .boolean()
      .oneOf([true], "You must agree to the Terms of Service"),
  });

  const validateChange = (event) => {
    yup
      .reach(clientRegisterSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({ ...errors, [event.target.name]: "" });
      })
      .catch((err) => {
        console.log("ERROR!", err);
        setErrors({ ...errors, [event.target.name]: err.errors[0] });
      });
  };

  useEffect(() => {
    clientRegisterSchema.isValid(formState).then((valid) => {
      console.log("valid?", valid);
      setFormValid(valid);
    });
  }, [formState]);

  const handleChange = (event) => {
    event.persist();
    if (event.target.name === "terms") {
      setFormState({ ...formState, terms: !formState.terms });
    } else if (event.target.name) {
      validateChange(event);
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
    //else false
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log({
        username: formState.username,
        password: formState.password,
        isTeacher: formState.isTeacher,
      });
    }
    setFormState({
      createUsername: "",
      password: "",
      confirmPassword: "",
      terms: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Returning Client</h1>
      <FormGroup>
        <Label htmlFor="createUsername">Create a Username</Label>
        <Input
          type="username"
          // username
          name="username"
          id="createUsername"
          placeholder="Create a Username"
          value={formState.createUsername}
          onChange={handleChange}
          cy-data="createUsername"
        />
        {errors.createUsername.length > 0 ? (
          <p className="error">{errors.createUsername}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          cy-data="password"
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formState.confirmPassword}
          onChange={handleChange}
          cy-data="confirmPassword"
        />
        {errors.confirmPassword.length > 0 ? (
          <p className="error">{errors.confirmPassword}</p>
        ) : null}
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            checked={formState.terms}
            onChange={handleChange}
            name="terms"
            cy-data="terms"
          />{" "}
          I agree to the Terms of Service
        </Label>
      </FormGroup>
      <Button type="submit" disabled={!formIsValid} cy-data="submit">
        Register
      </Button>
    </Form>
  );
};

export default ClientRegisterForm;
