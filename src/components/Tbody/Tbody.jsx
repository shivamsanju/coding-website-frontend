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
    <>
      {isPopupOpen && <Popup qId={qId} note={note} popupToggle={openPopup} />}
      <tr className={ques.done ? 'done' : null}>
        <td className='qid'>
          <input
            type='checkbox'
            checked={ques.done}
            id={ques.id}
            onChange={(checkbox) => {
              checkboxHandler(checkbox);
            }}
          ></input>
        </td>
        <td className='qname'>
          <a href={ques.url} rel='noreferrer' target='_blank'>
            {ques.name}
          </a>
        </td>
        <td className='qhint'>
          <img
            title={ques.notes}
            src={`${iconPath}note.png`}
            alt='link'
            onClick={() => {
              openNotes(ques.id, ques.notes);
            }}
          />
        </td>
        <td className='qpatterns'>
          {ques.pattern.map((pattern) => {
            return <span className='pattern'>{pattern}</span>;
          })}
        </td>
        <td>
          <span className={ques.difficulty.toLowerCase()}>
            {ques.difficulty}
          </span>
        </td>
        <td className='qcomp'>
          {ques.companies.map((company) => {
            return (
              <img
                key={company}
                title={company}
                src={`${iconPath}${company}.png`}
                alt={company}
                data-tip={company}
              />
            );
          })}
        </td>
      </tr>
    </>
  );
};

export default Tbody;
