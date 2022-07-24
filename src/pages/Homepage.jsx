import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from '../components/Table/Table';
import { useState } from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [doneQ, setDoneQ] = useState(0);
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  console.log(tab1, tab2, tab3);
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
          className={tab1 ? 'active' : ''}
          type='text'
          id='home'
          onClick={() => {
            setTab2(false);
            setTab3(false);
            setTab1(true);
            navigate('/');
          }}
        >
          Home
        </button>
        <button
          className={tab2 ? 'active' : ''}
          type='text'
          id='notes'
          onClick={() => {
            setTab2(true);
            setTab3(false);
            setTab1(false);
            navigate('/notes');
          }}
        >
          Notes
        </button>
        <button
          className={tab3 ? 'active' : ''}
          type='text'
          id='links'
          onClick={() => {
            setTab2(false);
            setTab3(true);
            setTab1(false);
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
