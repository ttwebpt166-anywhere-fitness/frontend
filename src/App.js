import React, { useState, useEffect } from "react";
import clientLoginForm from "./components/clientLoginForm";
import clientRegisterForm from "./components/clientRegisterForm";
import instructorLoginForm from "./components/instructorLoginForm";
import instructorRegisterForm from "./components/instructorRegisterForm";
import { Container, Button } from "reactstrap";
import { axiosWithAuth } from "./utilities/axiosWithAuth";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./actions";

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
        <Button a href={clientRegisterForm}>
          {" "}
          */} Create an Account
        </Button>
        <Button a href={clientLoginForm}>
          Login
        </Button>
      </div>
      <div className="Instructors">
        <h2>Instructors</h2>
        <Button a href={instructorRegisterForm}>
          Set Up an Account
        </Button>
        <Button a href={instructorLoginForm}>
          Login
        </Button>
      </div>
    </Container>
  );
}

export default App;
