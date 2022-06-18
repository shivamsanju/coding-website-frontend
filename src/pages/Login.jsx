import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import './Login.css';

export default function Login({ login }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === true) {
          login(json.token);
          navigate('/');
        } else {
          alert('Invalid Credentials');
          setUsername('');
          setPassword('');
        }
      });
  }
  return (
    <div className='container'>
      <h1 className='loginHeader'>LEETCODE PROBLEMS LOGIN</h1>
      <div className='Login'>
        <form onSubmit={handleSubmit}>
          <FormGroup className='username' controlId='username' bsSize='large'>
            <FormLabel className='loginText'>Username</FormLabel>
            <FormControl
              className='inputvalue'
              autoFocus
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='password' controlId='password' bsSize='large'>
            <FormLabel className='loginText'>Password</FormLabel>
            <FormControl
              className='inputvalue'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </FormGroup>
          <Button
            block
            bsSize='large'
            disabled={!performValidation()}
            type='submit'
            className='btn'
          >
            Login
          </Button>
        </form>
      </div>
      <h1 className='logininfo'>Username: demo</h1>
      <h1 className='logininfo'>Password: pass123</h1>
    </div>
  );
}
