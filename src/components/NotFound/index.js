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
            alt="not found"
            className="not-found-image"
          />
          <p className="not-found-heading">Page Not Found</p>
          <p className="not-found-details">
            we're sorry, the page you requested could not be found{' '}
          </p>
          <p className="not-found-details">Please go back to the homepage</p>
          <Link to="/">
            <button type="button" className="not-found-button">
              Home
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  </>
)

export default NotFound
