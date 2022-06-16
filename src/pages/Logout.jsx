import React from 'react';
import './Logout.css';

const Logout = () => {
  return (
    <>
      <div className='logout'>
        <h4>You have been logged out.</h4>

        <a href='https://shvm-leetcode-frontend.herokuapp.com/'>
          &#10999; Back to Login
        </a>
      </div>
    </>
  );
};

export default Logout;
