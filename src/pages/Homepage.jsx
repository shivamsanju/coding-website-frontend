import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from '../components/Table/Table';
import { useState } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [doneQ, setDoneQ] = useState(0);
  const [tab, setTab] = useState(1);
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
      <Navbar data={doneQ} />
      <TabWrapper />
      <Table progress={progress} />
    </div>
  );
};

export default Homepage;
