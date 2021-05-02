import React, { useState, useEffect } from "react";
// import clientLoginForm from "./tscomponents/clientLoginForm";
// import clientRegisterForm from "./tscomponents/clientRegisterForm";
// import instructorLoginForm from "./tscomponents/instructorLoginForm";
// import instructorRegisterForm from "./tscomponents/instructorRegisterForm";
import { Container, Button } from "reactstrap";
import { axiosWithAuth } from "./utilities/axiosWithAuth";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./actions";
import Register from "./tscomponents/Register";
function App() {
  const [post, setPost] = useState([]);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const submitUser = (user) => {
    axiosWithAuth
      .get("/", user)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="App">
      <h1>Anytime Fitness</h1>
      <div className="Members">
        <h2>Members</h2>
        {/* <p>Loading: {user.isLoading + ""}</p>
        <p>Username: {user.test}</p> */}
        <Button outline color="info">
          Client Login
        </Button>
      </div>
      <div className="Instructors">
        <h2>Instructors</h2>
        <Button color="danger">Instructor Login</Button>
      </div>
      <div className="Instructors">
        <h2>Register Here</h2>
        <Button color="primary">Registration</Button>
      </div>
      <Register />
    </Container>
  );
}

export default App;
