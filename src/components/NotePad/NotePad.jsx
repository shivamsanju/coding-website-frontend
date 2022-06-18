import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { SpinnerDotted } from 'spinners-react';
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

  return isLoading ? (
    <div className='spinner'>
      <SpinnerDotted enabled={isLoading} />
    </div>
  ) : (
    <div className='con'>
      <div className='notepadcard'>
        {data.map((ques, key) => {
          if (ques.notes) {
            return (
              <div key={key}>
                <h6 className='question-heading'>
                  {ques.notes ? ques.name : ''}
                </h6>
                <pre>{ques.notes}</pre>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default NotePad;
