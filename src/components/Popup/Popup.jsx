import React from 'react';
import { useState } from 'react';
import './Popup.css';
import Cookies from 'universal-cookie';

const iconPath = `${process.env.PUBLIC_URL}/assets/icons/`;

const Popup = ({ render }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [isPopupOpen, openPopup] = useState(true);
  const [quesID, setQuesID] = useState();
  const [notes, setNotes] = useState();

  const quesIDHandler = (event) => {
    console.log(event.target.value);
    setQuesID(event.target.value);
  };

  const notesHandler = (event) => {
    console.log(event.target.value);
    setNotes(event.target.value);
  };

  const cancelHandler = () => {
    openPopup(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      id: quesID,
      noteData: notes,
    };
    console.log(payload);
    await fetch(`https://leetcode-app-backend.herokuapp.com/api/notes`, {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify(payload),
    });
    openPopup(true);
    render();
    window.location.reload();
    console.log('successfull');
  };
  return isPopupOpen ? (
    <div className='popup-false'>
      <button
        className='addQuestions'
        type='submit'
        name='addNotes'
        onClick={() => {
          openPopup(false);
        }}
      >
        <img
          src={`${iconPath}add.png`}
          height={20}
          width={20}
          alt='add notes'
        />
        <p>Add Notes</p>
      </button>
    </div>
  ) : (
    <div className='popup-container'>
      <form onSubmit={handleSubmit}>
        <p>Add Notes</p>
        <div>
          <label for='quesId'>Question ID</label>
          <input
            type='text'
            name='quesId'
            onChange={(event) => {
              quesIDHandler(event);
            }}
          />
        </div>
        <div>
          <label for='notes'>Note</label>
          <textarea
            rows='9'
            cols='23'
            name='notes'
            onChange={(event) => {
              notesHandler(event);
            }}
          />
        </div>
        <button type='submit'>Add</button>
        <button className='cancel' onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Popup;
