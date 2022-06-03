import "./Navbar.css"
const iconPath = `${process.env.PUBLIC_URL}/assets/icons/`;


const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='header'><a className='github' href='https://github.com/shivamsanju'><img src={`${iconPath}logo.png`} alt="link" /></a>Leetcode Problems</span>
        <div className="social">
        <a className='github' href='https://github.com/shivamsanju'><img src={`${iconPath}linkedinicon.png`} alt="link" /></a>
        <a className='github' href='https://github.com/shivamsanju'><img src={`${iconPath}githubicon.png`} alt="link" /></a>
        </div>
    </div>
  )
}

export default Navbar