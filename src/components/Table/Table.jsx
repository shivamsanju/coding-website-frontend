import './Table.css';
import React, { useState, useEffect } from 'react';
import Tbody from '../Tbody/Tbody';
import Cookies from 'universal-cookie';
import { SpinnerDotted } from 'spinners-react';

const Table = ({ progress }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://leetcode-app-backend.herokuapp.com/api/questions`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', token: token },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.questions) {
          setData(json.questions);
          progress(json.questions);
        }
        setLoading(false);
      });
  }, []);

  const checkBoxState = (q) => {
    data.forEach((p) => {
      if (p.id.toString() === q.id) {
        console.log(p.done, q.currStatus);
        p.done = q.currStatus;
        console.log(p.done, q.currStatus);
        console.log('changed');
      }
    });
    setData([...data]);
    progress([...data]);
  };
  console.log(isLoading);
  return (
    <div className='con'>
      <div className='table-row table-header'>
        <div>Status</div>
        <div>Name</div>
        <div>Notes</div>
        <div>Pattern</div>
        <div>Difficulty</div>
        <div>Companies</div>
      </div>
      {isLoading ? (
        <div className='spinner'>
          <SpinnerDotted enabled={isLoading} />
        </div>
      ) : (
        data.map((ques) => {
          return <Tbody key={ques.id} ques={ques} cState={checkBoxState} />;
        })
      )}
    </div>
  );
};

export default Table;
