import './Navbar.css';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LBoard from '../LBoard/Lboard';
import { useEffect } from 'react';
const iconPath = `${process.env.PUBLIC_URL}/assets/icons/`;

const Navbar = ({ data }) => {
  const [isPopupOpen, openPopup] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const logoutHandler = () => {
    cookies.remove('token');
    navigate('/logout');
  };
  const popupHandler = () => {
    openPopup(true);
  };

  return (
    <>
      {isPopupOpen && <LBoard popupToggle={openPopup} />}
      <div className='nav-container'>
        <div>
          <div className='progress-text'>
            You have completed {data} out of 171 questions
          </div>
          <progress
            className='progress-bar'
            id='file'
            value={data}
            max='171'
          ></progress>
        </div>
        <div className='navbar'>
          <div className='header'>
            <img src={`${iconPath}logo.png`} alt='link' height={25} />
            Leetcode Problems
          </div>
          <div className='menu'>
            <div className='social'>
              <a
                className='github'
                target='_blank'
                rel='noreferrer'
                href='https://shvmsnju.vercel.app/'
              >
                <img
                  src={`${iconPath}personal.png`}
                  alt='Website'
                  height={25}
                />
              </a>
              <a
                className='linkd'
                target='_blank'
                rel='noreferrer'
                href='https://www.linkedin.com/in/shvmsnju'
              >
                <img
                  src={`${iconPath}linkedinicon.png`}
                  alt='LinkedIn'
                  height={25}
                />
              </a>
              <a
                className='github'
                target='_blank'
                rel='noreferrer'
                href='https://github.com/shivamsanju'
              >
                <img
                  src={`${iconPath}githubicon.png`}
                  alt='GitHub'
                  height={25}
                />
              </a>
              <a
                className='github'
                target='_blank'
                rel='noreferrer'
                href='https://github.com/shivamsanju/dsa-webapp-frontend/fork'
              >
                <img src={`${iconPath}fork.png`} alt='Website' height={25} />
              </a>
            </div>
            <div>
              <button className='leaderboard-btn' onClick={popupHandler}>
                <img
                  src={`${iconPath}leaderboard.png`}
                  alt='LeaderBoard'
                  height={25}
                />
              </button>
              <button className='logoutbtn' onClick={logoutHandler}>
                <img
                  title='logout'
                  src={`${iconPath}logout.png`}
                  alt='logout'
                  height={25}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
