import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {menuOpened: false}

  renderMenu = () => (
    <div className="header-menu-container">
      <div className="header-menu-icon-link-container">
        <li className=" light-black">
          <Link to="/" className="nav-link-item mobile mr nav-button">
            <button type="button">Home</button>
          </Link>
        </li>
        <li className="nav-link-item light-black">
          <Link to="/about" className="nav-link-item mobile mr nav-button">
            <button type="button">About</button>
          </Link>
        </li>
      </div>
      <button
        type="button"
        className="menu-button"
        onClick={() => {
          this.setState(previous => ({menuOpened: !previous.menuOpened}))
        }}
      >
        <Link to="/">
          <img
            src="https://res.cloudinary.com/jithu1997/image/upload/v1677240510/CovidDashBoard/Solid_dehh2k.png"
            alt="close button"
          />
        </Link>
      </button>
    </div>
  )

  render() {
    const {menuOpened} = this.state

    return (
      <>
        <nav className="nav-container">
          <ul className="responsive-nav-container">
            <h1 className="nav-heading">COVID19INDIA</h1>

            <ul className="nav-link-container">
              <button
                type="button"
                className="menu-button menu-icon-position"
                onClick={() => {
                  this.setState(previous => ({
                    menuOpened: !previous.menuOpened,
                  }))
                }}
              >
                <img
                  src="https://res.cloudinary.com/jithu1997/image/upload/v1677235941/CovidDashBoard/add-to-queue_1_2_z0aani.png"
                  alt="menu"
                />
              </button>

              <li className=" light-black">
                <Link to="/" className="nav-link-item desktop nav-button">
                  <button type="button">Home</button>
                </Link>
              </li>

              <li className="nav-link-item light-black ">
                <Link to="/about" className="desktop nav-button">
                  <button type="button">About</button>
                </Link>
              </li>
            </ul>
          </ul>
          {menuOpened ? this.renderMenu() : null}
        </nav>
      </>
    )
  }
}

export default Header
