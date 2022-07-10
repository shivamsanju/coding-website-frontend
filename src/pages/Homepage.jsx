import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from '../components/Table/Table';
import { useState } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [doneQ, setDoneQ] = useState(0);

  const progress = (data) => {
    let done = 0;
    data.forEach((q) => {
      if (q.done === true) {
        done += 1;
      }
    });
    setDoneQ(done);
  };

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
      <Navbar data={doneQ} />
      <TabWrapper />
      <Table progress={progress} />
    </div>
  );
};

export default Homepage;
