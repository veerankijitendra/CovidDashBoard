import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="bottom-footer-con">
    <h1 className="footer-heading">
      COVID19<span className="blue-color">INDIA</span>
    </h1>
    <p className="footer-para">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icon-con">
      <VscGithubAlt className="footer-icon one" />
      <FiInstagram className="footer-icon one" />
      <FaTwitter className="footer-icon one" />
    </div>
  </div>
)

export default Footer
