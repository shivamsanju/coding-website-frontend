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

  const updateProgress = (id, status) => {
    const updatedValue = data.map((ques) => {
      if (ques.id.toString() === id) {
        return { ...ques, done: status };
      } else {
        return ques;
      }
    });
    setData([...updatedValue]);
    progress([...data]);
  };

  const renderNote = (qId, note) => {
    console.log(qId, note);
    const newData = data.map((object) => {
      if (object.id === qId) {
        return { ...object, notes: note };
      }
      return object;
    });
    setData([...newData]);
  };

  console.log('jbsdhbjksdbkdjsbkj');
  return (
    <div className='con'>
      <div className='table-row table-header'>
        <div>Done</div>
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
        data.map((ques, key) => {
          return (
            <Tbody
              key={key}
              Pques={ques}
              updateProgress={updateProgress}
              renderNote={renderNote}
            />
          );
        })
      )}
    </div>
  );
};

export default Table;
