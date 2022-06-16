import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Table from '../components/Table/Table';
import { useState } from 'react';
// import Popup from '../components/Popup/Popup';

const Homepage = () => {
  console.log('Homepage');
  // const [rendervar, rerender] = useState(0);
  // const forceRender = () => {
  //   rerender(!rendervar);
  // };
  const [doneQ, setDoneQ] = useState(0);
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

  return (
    <div className='home'>
      <Navbar done={doneQ} />
      {/* <Popup render={forceRender} /> */}
      <Table progress={progress} />
    </div>
  );
};

export default Homepage;
