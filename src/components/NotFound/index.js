import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-con">
      <div className="not-found-responsive">
        <div className="not-found-page-details">
          <img
            src="https://res.cloudinary.com/jithu1997/image/upload/v1677509302/Group_7485_viisn0.png"
            alt="not-found-pic"
            className="not-found-image"
          />
          <h1 className="not-found-heading">PAGE NOT FOUND</h1>
          <p className="not-found-details">
            we are sorry, the page you requested could not be found
          </p>
          <p className="not-found-details">Please go back to the homepage</p>

          <button type="button" className="not-found-button">
            <Link to="/">Home</Link>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  </>
)

export default NotFound
