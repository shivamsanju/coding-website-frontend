import React from 'react';
import { useState } from 'react';
import './LBoard.css';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const LBoard = ({ popupToggle }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [leaderData, setLeaderData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://leetcode-app-backend.herokuapp.com/api/leaderboard`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', token: token },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setLeaderData(data.data);
        setLoading(false);
      });
  }, []);

  const cancelHandler = () => {
    popupToggle(false);
  };

  return (
    <div className='leaderboard'>
      <div className='leaderboard-header'>
        Problems Solved <button type='text' onClick={cancelHandler} value='X' />
      </div>
      {isLoading ? (
        <div className='spinner-lb'>
          <SpinnerCircularFixed enabled={isLoading} height={25} width={25} />
        </div>
      ) : (
        <div className='leaderboard-container'>
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
      )}
    </div>
  );
};

export default LBoard;
