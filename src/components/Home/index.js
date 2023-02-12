import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import statesListContext from '../../context/statesListContext'

import Header from '../Header'
import Footer from '../Footer'
import HomeTotalCases from '../HomeTotalCases'
import HomeStateWiseContainer from '../HomeStateWiseContainer'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  updated: 'UPDATED',
}

class Home extends Component {
  state = {
    search: '',
    apiStatus: apiStatusConstants.loading,
    fetchedData: {},
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  //   totalOfAllCases = (data) ={
  //       const total = data.map(each =>)
  //   }

  getStateWiseData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    this.setState({
      fetchedData: {...data},
      apiStatus: apiStatusConstants.updated,
    })
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  renderLoadingPhase = () => (
    <>
      <Header />
      <div className="home-loading-container" data-testId="homeRouteLoader">
        <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
      </div>
    </>
  )

  renderUpdatedPhase = value => {
    const {search, fetchedData} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-responsive-container">
            <div className="search-and-icon-container">
              <BsSearch className="search-icon" />
              <input
                className="search-element"
                type="search"
                onChange={this.onChangeSearchInput}
                value={search}
                placeholder="Enter the State"
              />
            </div>
          </div>
          <HomeTotalCases statesList={value} fetchedData={fetchedData} />
          <HomeStateWiseContainer statesList={value} data={fetchedData} />
          <Footer />
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <statesListContext.Consumer>
        {value => {
          switch (apiStatus) {
            case apiStatusConstants.loading:
              return this.renderLoadingPhase()
            case apiStatusConstants.updated:
              return this.renderUpdatedPhase(value)

            default:
              return null
          }
        }}
      </statesListContext.Consumer>
    )
  }
}

export default Home
