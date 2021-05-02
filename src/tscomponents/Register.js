import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import * as yup from "yup";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Registration = () => {
  const { push } = useHistory();
<<<<<<< HEAD

  const dispatch = useDispatch();

=======
  const dispatch = useDispatch();
>>>>>>> main
  const [user, setUser] = useState({
    username: "",
    password: "",
    instructorCode: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    instructorCode: "",
  });

  const [disabled, setDisabled] = useState(true);

  const clientRegisterSchema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!"),
    instructorCode: yup.string().notRequired(""),
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
    clientRegisterSchema.isValid(user).then((valid) => {
      console.log("valid?", valid);
      setDisabled(!valid);
    });
  }, [clientRegisterSchema, user]);

  const handleChange = (e) => {
    e.persist();
    validateChange(e);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
console.log('look', !!user.instructorCode)
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
<<<<<<< HEAD
      .post("/auth/register", {
        username: user.username,
        password: user.password,
        isTeacher: !!user.instructorCode,
      })
      .then((res) => {
        console.log("New User from Registration", res.data);
        setUser({
          username: "",
          password: "",
          instructorCode: "",
        });
        dispatch({ type: "LOGGING_IN", payload: res.data });
        push("/");
      })
      .catch((error) => {
        console.log(error.message);
=======
    .post("/auth/register", {
      username: user.username,
      password: user.password,
      isTeacher: !!user.instructorCode,
    })
    .then((res) => {
      console.log("New User from Registration", res.data);
      setUser({
        username: "",
        password: "",
        instructorCode: "",
>>>>>>> main
      });
      dispatch({ type: "LOGGING_IN", payload: res.data });
      push("/");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

  return (
    <Form onSubmit={handleSubmit}>
      <h2 id="subhead">Sign Up</h2>
      <FormGroup>
        <Label htmlFor="username">User Name</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="User Name"
          value={user.username}
          onChange={handleChange}
          cy-data="username"
        />
        {errors.username.length > 0 ? (
          <p className="error">{errors.username}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          cy-data="password"
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="instructorCode">Instructor Code</Label>
        <Input
          type="instructorCode"
          name="instructorCode"
          id="instructorCode"
          placeholder="Instructor Code"
          value={user.instructorCode}
          onChange={handleChange}
          cy-data="instructorCode"
        />
        {errors.instructorCode.length > 0 ? (
          <p className="error">{errors.instructorCode}</p>
        ) : null}
      </FormGroup>

      <Button type="submit" disabled={disabled} cy-data="submit">
        Register
      </Button>
    </Form>
  );
};

export default Registration;
