import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import * as yup from "yup";
import axios from "axios";

const ClientRegisterForm = ({ submitClientReg }) => {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    zipcode: "",
    password: "",
    confirmpassword: "",
    terms: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    zipcode: "",
    createUsername: "",
    password: "",
    confirmpassword: "",
    terms: "",
  });

  const [disabled, setDisabled] = useState(true);

  const clientRegisterSchema = yup.object().shape({
    firstname: yup.string().required("First name is required!"),
    lastname: yup.string().required("Last name is required!"),
    email: yup.string().required("Email is required!"),
    zipcode: yup.string().required("Zipcode is required!"),
    createUsername: yup.string().required("Create a username to login!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be 6 chars long"),
    confirmpassword: yup
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
      setDisabled(!valid);
    });
  }, [formState]);

  const handleChange = (event) => {
    event.persist();
    validateChange(event);
    if (event.target.name === true) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
    //else false
  };

  const [post, setPost] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    submitClientReg(formState);
    submitClientReg(formState);
    setFormState({
      firstname: "",
      lastname: "",
      email: "",
      zipcode: "",
      createUsername: "",
      password: "",
      confirmpassword: "",
      terms: "",
    });

    axios
      .post("https://anywhere-fitness-server.herokuapp.com/v1/", user)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Returning Client</h1>
      <FormGroup>
        <Label htmlFor="firstname">First Name</Label>
        <Input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
          value={formState.firstname}
          onChange={handleChange}
          cy-data="firstname"
        />
        {error.name.length > 0 ? (
          <p className="error">{errors.firstname}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastname">Last Name</Label>
        <Input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Last Name"
          value={formState.lastname}
          onChange={handleChange}
          cy-data="lastname"
        />
        {error.name.length > 0 ? (
          <p className="error">{errors.lastname}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          cy-data="email"
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="zipcode">Zipcode</Label>
        <Input
          type="zipcode"
          name="zipcode"
          id="zipcode"
          placeholder="zipcode"
          value={formState.zipcode}
          onChange={handleChange}
          cy-data="zipcode"
        />
        {errors.zipcode.length > 0 ? (
          <p className="error">{errors.zipcode}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="createUsername">Create a Username</Label>
        <Input
          type="username"
          name="createUsername"
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
          value={formState.confirmpassword}
          onChange={handleChange}
          cy-data="confirmPassword"
        />
        {errors.confirmpassword.length > 0 ? (
          <p className="error">{errors.confirmpassword}</p>
        ) : null}
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            onChange={handleChange}
            name="terms"
            cy-data="terms"
          />{" "}
          I agree to the Terms of Service
        </Label>
      </FormGroup>
      <Button type="submit" disabled={disabled} cy-data="submit">
        Register
      </Button>
    </Form>
  );
};

export default ClientRegisterForm;
