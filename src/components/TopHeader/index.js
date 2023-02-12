import {withRouter} from 'react-router-dom'

import './index.css'

const TopHeader = () => (
  <nav className="nav-container">
    <div className="responsive-nav-container">
      <h1 className="nav-heading">
        COVID19<span className="blue-color">INDIA</span>
      </h1>
      <ul className="nav-link-container">
        <li className="nav-link-item">Home</li>
        <li className="nav-link-item light-black">About</li>
      </ul>
    </div>
  </nav>
)

export default withRouter(TopHeader)
