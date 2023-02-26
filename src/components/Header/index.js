import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {menuOpened, toggleMenOpened} = props
  const renderMenu = () => (
    <div className="header-menu-container">
      <div className="header-menu-icon-link-container">
        <Link to="/" className="nav-link-item mobile mr">
          <li className=" light-black">Home</li>
        </Link>
        <Link to="/about" className="nav-link-item mobile mr">
          <li className="nav-link-item light-black">About</li>
        </Link>
      </div>
      <button
        type="button"
        className="menu-button"
        onClick={() => {
          toggleMenOpened()
        }}
      >
        <img
          src="https://res.cloudinary.com/jithu1997/image/upload/v1677240510/CovidDashBoard/Solid_dehh2k.png"
          alt="close button"
        />
      </button>
    </div>
  )

  return (
    <>
      <nav className="nav-container">
        <ul className="responsive-nav-container">
          <h1 className="nav-heading">
            COVID19<span className="blue-color">INDIA</span>
          </h1>

          <ul className="nav-link-container">
            <button
              type="button"
              className="menu-button menu-icon-position"
              onClick={() => {
                toggleMenOpened()
              }}
            >
              <img
                src="https://res.cloudinary.com/jithu1997/image/upload/v1677235941/CovidDashBoard/add-to-queue_1_2_z0aani.png"
                alt="menu"
              />
            </button>
            <Link to="/" className="nav-link-item desktop">
              <li className=" light-black">Home</li>
            </Link>
            <Link to="/about" className="desktop">
              <li className="nav-link-item light-black ">About</li>
            </Link>
          </ul>
        </ul>
      </nav>
      {menuOpened ? renderMenu() : null}
    </>
  )
}

export default Header
