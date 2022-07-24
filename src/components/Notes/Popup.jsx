import React from 'react';
import { useState } from 'react';
import './Popup.css';
import Cookies from 'universal-cookie';

const Popup = ({ qId, note, popupToggle, renderNote }) => {
  console.log(qId, note);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [notes, setNotes] = useState();
  const [notesHeader, setNotesHeader] = useState();
  const [ide, toggleide] = useState(false);

  const notesHandler = (event) => {
    setNotes(event.target.value);
  };
  const notesHeaderHandler = (event) => {
    setNotesHeader(event.target.value);
  };

  const cancelHandler = () => {
    popupToggle(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    popupToggle(false);
    const payload = {
      id: qId,
      notesHeader: notesHeader,
      noteData: notes,
    };
    console.log(payload);
    await fetch(`https://leetcode-app-backend.herokuapp.com/api/notes`, {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify(payload),
    });
    renderNote(qId, notes);
    console.log('successfull');
  };

  const ideHandler = (event) => {
    event.preventDefault();
    toggleide(!ide);
  };

  return (
    <div className='popup-container'>
      <form onSubmit={handleSubmit}>
        {ide ? (
          <iframe
            title={qId}
            frameborder='0'
            width='100%'
            height='94%'
            src='https://replit.com/@ritza/demo-embed?lite=true'
          >
            {notes}
          </iframe>
        ) : (
          <>
            <textarea
              onChange={notesHeaderHandler}
              placeholder='Enter Question'
            >
              {note}
            </textarea>
            <textarea
              onChange={notesHandler}
              placeholder='Start writing notes here...'
            >
              {note}
            </textarea>
          </>
        )}
        <button type='submit'>Add</button>
        <button className='cancel' onClick={cancelHandler}>
          Cancel
        </button>
        <button className='ide' onClick={ideHandler}>
          Toggle IDE Mode
        </button>
      </form>
    </div>
  );
};

export default Popup;
