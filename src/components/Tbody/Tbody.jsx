import React, { useState } from 'react';
import './Tbody.css';
import Cookies from 'universal-cookie';
import Popup from '../Notes/Popup';

const iconPath = `${process.env.PUBLIC_URL}/assets/icons/`;

const Tbody = ({ ques, cState }) => {
  const [qId, setQId] = useState();
  const [note, setNote] = useState();
  const [isPopupOpen, openPopup] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const checkboxHandler = (checkbox) => {
    const target = checkbox.currentTarget;
    const payload = {
      id: target.id,
      currStatus: target.checked,
    };
    console.log(payload);
    fetch(`https://leetcode-app-backend.herokuapp.com/api/status`, {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify(payload),
    }).then(cState(payload));
  };

  const openNotes = (qId, qNote) => {
    setQId(qId);
    setNote(qNote);
    openPopup(true);
  };

  return (
    <div className={ques.done ? 'done table-row' : 'table-row'}>
      {isPopupOpen && <Popup qId={qId} note={note} popupToggle={openPopup} />}
      <div className='qid'>
        <input
          type='checkbox'
          checked={ques.done}
          id={ques.id}
          onChange={(checkbox) => {
            checkboxHandler(checkbox);
          }}
        ></input>
      </div>
      <div className='qname'>
        <a href={ques.url} rel='noreferrer' target='_blank'>
          {ques.name}
        </a>
      </div>
      <div className='qhint'>
        <img
          title={ques.notes}
          src={`${iconPath}notes.png`}
          height={18}
          alt='link'
          onClick={() => {
            openNotes(ques.id, ques.notes);
          }}
        />
      </div>
      <div className='qpatterns'>
        {ques.pattern.map((pattern, key) => {
          return (
            <span key={key} className='pattern'>
              {pattern}
            </span>
          );
        })}
      </div>
      <div>
        <span className={ques.difficulty.toLowerCase()}>{ques.difficulty}</span>
      </div>
      <div className='qcomp'>
        {ques.companies.map((company, key) => {
          return (
            <div key={key}>
              <img
                title={company}
                src={`${iconPath}${company}.png`}
                alt={company}
                data-tip={company}
                width={18}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tbody;
