import './Navbar.css';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const iconPath = `${process.env.PUBLIC_URL}/assets/icons/`;

const Navbar = ({ done }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const logoutHandler = () => {
    cookies.remove('token');
    navigate('/logout');
  };
  return (
    <div className='nav-container'>
      <div className='navbar'>
        <span className='header'>
          <img src={`${iconPath}logo.png`} alt='link' />
          Leetcode Problems
        </span>
        <div className='social'>
          <a className='linkd' href='https://www.linkedin.com/in/shvmsnju'>
            <img
              src={`${iconPath}linkedinicon.png`}
              alt='LinkedIn'
              height={35}
            />
          </a>
          <a className='github' href='https://github.com/shivamsanju'>
            <img src={`${iconPath}githubicon.png`} alt='GitHub' height={35} />
          </a>
          <button className='logout' onClick={logoutHandler}>
            <img
              title='logout'
              src={`${iconPath}logout.png`}
              alt='logout'
              height={35}
            />
          </button>
        </div>
      </div>
      <div>
        <span className='progress-text'>
          You have completed {done} out of 171 questions
        </span>
        <progress
          className='progress-bar'
          id='file'
          value={done}
          max='171'
        ></progress>
      </div>
    </div>
  );
};

export default Navbar;
