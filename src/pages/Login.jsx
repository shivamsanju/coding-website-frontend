import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import "./Login.css";
import Cookies from "universal-cookie";

export default function Login({ login }) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function performValidation() {
    return username.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    let payload = {
      username: username,
      password: password,
    };
    fetch(`https://leetcode-app-backend.herokuapp.com/api/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === true) {
          login(json.token);
          navigate("questions");
        } else {
          alert("Invalid Credentials");
          setUsername("");
          setPassword("");
        }
      });
  }
  return (
    <div className="container">
      <h1 className="loginHeader">LEETCODE PROBLEMS LOGIN</h1>
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>
              <b>Username</b>
            </FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="password" controlId="password" bsSize="large">
            <FormLabel>
              <b>Password</b>
            </FormLabel>
            <FormControl
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!performValidation()}
            type="submit"
            className="btn"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
