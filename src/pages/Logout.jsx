import React from 'react';
import './Logout.css';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const returnToLogin = () => {
    navigate('/');
    window.location.reload();
  };
  return (
    <>
      <div className='logout'>
        <h4>You have been logged out.</h4>
        <button onClick={returnToLogin}>&#10999; Back to Login</button>
      </div>
    </>
  );
};

export default Logout;
