import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import './Login.css';

export default function Login({ login }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [signup, toggleSignup] = useState(false);
  const [errorAlert, setAllert] = useState();
  const [isBtnActive, setBtnActive] = useState(true);

  function performValidation() {
    return username.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    setBtnActive(false);
    setAllert('');
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
          console.log(json.message);
          setAllert(json.message);
          setBtnActive(true);
        }
      });
  }

  function handleSignUp(event) {
    event.preventDefault();
    setBtnActive(false);
    setAllert('');
    let payload = {
      username: username,
      password: password,
      confPassword: cnfPassword,
    };
    fetch(`https://leetcode-app-backend.herokuapp.com/api/signup`, {
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
          console.log(json.message);
          setAllert(json.message);
          setBtnActive(true);
        }
      });
  }

  const signupToggler = (event) => {
    event.preventDefault();
    setAllert('');
    setUsername('');
    setPassword('');
    toggleSignup(!signup);
  };
  return (
    <div className='container'>
      <h2 className='loginHeader'>LEETCODE PROBLEMS LOGIN</h2>
      {/* <div className='login-signup' onClick={signupToggler}>
        {signup ? 'Click here to Log In!' : 'Click here to Sign Up!'}
      </div> */}
      {signup ? (
        <div className='Login'>
          <form onSubmit={handleSignUp}>
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
            <FormGroup className='password' controlId='password' bsSize='large'>
              <FormLabel className='loginText'>Confirm</FormLabel>
              <FormControl
                className='inputvalue'
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                type='password'
              />
            </FormGroup>
            <p className='error-alert'>{errorAlert}</p>
            <Button
              block
              bsSize='large'
              disabled={!performValidation()}
              type='submit'
              className='btn'
            >
              {isBtnActive ? 'Sign Up' : '...'}
            </Button>
          </form>
        </div>
      ) : (
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
            <p className='error-alert'>{errorAlert}</p>
            <Button
              block
              bsSize='large'
              disabled={!performValidation()}
              type='submit'
              className='btn'
            >
              {isBtnActive ? 'Log In' : '...'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
