import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import './Homepage.css';
import Links from '../components/Links/Links';
import { useNavigate } from 'react-router-dom';

const Link = () => {
  const navigate = useNavigate();

  const TabWrapper = () => {
    return (
      <div className='tabs'>
        <button type='text' id='home' onClick={() => navigate('/')}>
          Home
        </button>
        <button type='text' id='notes' onClick={() => navigate('/notes')}>
          Notes
        </button>
        <button type='text' id='links' onClick={() => navigate('/links')}>
          Links
        </button>
      </div>
    );
  };

  return (
    <div className='home'>
      <Navbar />
      <TabWrapper />
      <Links />
    </div>
  );
};

export default Link;
