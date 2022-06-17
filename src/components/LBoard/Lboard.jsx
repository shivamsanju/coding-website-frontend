import React from 'react';
import { useState } from 'react';
import './LBoard.css';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';

const LBoard = ({ popupToggle }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [leaderData, setLeaderData] = useState();

  useEffect(() => {
    fetch(`https://leetcode-app-backend.herokuapp.com/api/leaderboard`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', token: token },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setLeaderData(data.data);
      });
  }, []);

  const cancelHandler = () => {
    popupToggle(false);
  };

  return (
    <div className='leaderboard'>
      <div>
        Problems Solved{' '}
        <button type='text' onClick={cancelHandler}>
          X
        </button>
      </div>
      <table className='userCard'>
        {leaderData ? (
          leaderData.map((user) => {
            return (
              <tr>
                <td>{user.username}</td>
                <td>{user.done}</td>
              </tr>
            );
          })
        ) : (
          <></>
        )}
      </table>
    </div>
  );
};

export default LBoard;
