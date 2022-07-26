import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { SpinnerCircularFixed } from 'spinners-react';
import './Notepad.css';
import { marked } from 'marked';

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
  }, [token]);

  let notesData = [];
  for (const ques of data) {
    if (ques.notes) {
      notesData.push(
        <div key={ques.id}>
          <h6 className='question-title'>
            {ques.id + 1}. {ques.notes ? ques.name : ''}
          </h6>
          <div className='question-content'>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: marked(ques.notes_header),
              }}
            ></div> */}
            <div
              dangerouslySetInnerHTML={{
                __html: marked(ques.notes),
              }}
            ></div>
          </div>
        </div>
      );
    }
  }
  console.log(notesData);

  return (
    <div className='cons'>
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
