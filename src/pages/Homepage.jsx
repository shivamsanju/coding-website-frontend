import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from '../components/Table/Table';
import { useState, useEffect } from 'react';
import NotePad from '../components/NotePad/NotePad';
import './Homepage.css';
import Links from '../components/Links/Links';

const Homepage = () => {
  const [doneQ, setDoneQ] = useState(0);
  const [tab, setTab] = useState('home');
  const progress = (data) => {
    let total = 0;
    let done = 0;
    data.forEach((ques) => {
      if (ques.done === true) {
        done += 1;
      }
      total += 1;
    });
    setDoneQ(done);
  };

  useEffect(() => {
    document.getElementById(tab).focus();
  }, [tab]);

  const TableWrapper = () => {
    if (tab === 'notes') {
      console.log('notes');
      return <NotePad />;
    } else if (tab === 'links') {
      return <Links />;
    } else {
      return <Table progress={progress} />;
    }
  };

  const TabWrapper = () => {
    return (
      <div className='tabs'>
        <button type='text' id='home' onClick={() => setTab('home')}>
          Home
        </button>
        <button type='text' id='notes' onClick={() => setTab('notes')}>
          Notes
        </button>
        <button type='text' id='links' onClick={() => setTab('links')}>
          Important Links
        </button>
      </div>
    );
  };

  return (
    <div className='home'>
      <Navbar done={doneQ} />
      <TabWrapper />
      <TableWrapper />
    </div>
  );
};

export default Homepage;
