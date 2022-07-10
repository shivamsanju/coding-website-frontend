import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { SpinnerCircularFixed } from 'spinners-react';
import './Notepad.css';

const NotePad = () => {
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
        }
        setLoading(false);
      });
  }, []);

  let notesData = [];
  for (const ques of data) {
    if (ques.notes) {
      notesData.push(
        <div key={ques.id}>
          <h6 className='question-heading'>{ques.notes ? ques.name : ''}</h6>
          <pre>{ques.notes}</pre>
        </div>
      );
    }
  }
  console.log(notesData);

  return (
    <div className='con'>
      {isLoading ? (
        <div className='spinner'>
          <SpinnerCircularFixed enabled={isLoading} />
        </div>
      ) : (
        <div className='notepadcard'>
          {notesData}
          {notesData.length <= 0 && <div>Please start taking notes...</div>}
        </div>
      )}
    </div>
  );
};

export default NotePad;
