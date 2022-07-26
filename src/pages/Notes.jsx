import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import NotePad from '../components/NotePad/NotePad';
import './Homepage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(2);

  const TabWrapper = () => {
    return (
      <div className='tabs'>
        <button
          className={tab === 1 ? 'active' : ''}
          type='text'
          id='home'
          onClick={() => {
            setTab(1);
            navigate('/');
          }}
        >
          Home
        </button>
        <button
          className={tab === 2 ? 'active' : ''}
          type='text'
          id='notes'
          onClick={() => {
            setTab(2);
            navigate('/notes');
          }}
        >
          Notes
        </button>
        <button
          className={tab === 3 ? 'active' : ''}
          type='text'
          id='links'
          onClick={() => {
            setTab(3);
            navigate('/links');
          }}
        >
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
