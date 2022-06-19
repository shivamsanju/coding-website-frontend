import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import NotePad from '../components/NotePad/NotePad';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
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
      <NotePad />
    </div>
  );
};

export default Notes;
