import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'initial',
  loading: 'loading',
  updated: 'updated',
}

class About extends Component {
  state = {data: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    this.setState({apiStatus: apiStatusConstants.updated, data: [...data.faq]})
  }

  renderAboutDetails = () => {
    const {data} = this.state
    return (
      <div className="about-responsive">
        <h1 className="about-heading">About</h1>
        <p className="about-last-update">Last update on march 28th 2021</p>
        <p className="about-info">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="about-fcq-list-con" testId="faqsUnorderedList">
          {data.map(each => (
            <li key={each.id}>
              <p className="about-list-question">{each.question}</p>
              <p className="about-list-answer">{each.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderUpdatedPhase = () => (
    <>
      <Header />
      <div className="about-con">
        {this.renderAboutDetails()}
        <Footer />
      </div>
    </>
  )

  renderLoadingPhase = () => (
    <ul>
      <Header />
      <div className="home-loading-container">
        {/* testId="homeRouteLoader" */}
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </div>
    </ul>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingPhase()
      case apiStatusConstants.updated:
        return this.renderUpdatedPhase()

      default:
        return null
    }
  }
}

export default About
