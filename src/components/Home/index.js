import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import {BiChevronRightSquare} from 'react-icons/bi'

import StatesListContext from '../../context/statesListContext'

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
    menuOpened: false,
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

    this.setState({
      fetchedData: {...data},
      apiStatus: apiStatusConstants.updated,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = (data, statesList) => {
    const resultList = []

    // getting keys of an object object

    const keyNames = Object.keys(data)
    // console.log(keyNames)
    // console.log(data, statesList)

    keyNames.forEach(keyName => {
      // console.log(keyName)
      if (data[keyName]) {
        const {total} = data[keyName]
        // console.log(keyName, total)

        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        // console.log(keyName, confirmed, deceased, recovered, tested, population)
        resultList.push({
          stateCode: keyName,
          name:
            statesList.find(state => state.state_code === keyName) !== undefined
              ? statesList.find(state => state.state_code === keyName)
                  .state_name
              : null,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    // console.log(resultList)
    return resultList
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  renderLoadingPhase = () => {
    const {menuOpened} = this.state
    return (
      <ul>
        <Header
          menuOpened={menuOpened}
          toggleMenOpened={this.toggleMenOpened}
        />
        <div className="home-loading-container">
          {/* testId="homeRouteLoader" */}
          <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
        </div>
      </ul>
    )
  }

  renderEnterNotEnterComponents = value => {
    const {fetchedData} = this.state
    const listFormattedDataUsingForInMethod = this.convertObjectsDataIntoListItemsUsingForInMethod(
      fetchedData,
      value,
    )
    return (
      <>
        <HomeTotalCases statesList={value} fetchedData={fetchedData} />
        <HomeStateWiseContainer
          statesList={value}
          data={listFormattedDataUsingForInMethod}
        />
        <Footer />
      </>
    )
  }

  renderStateListWhileSearch = value => {
    const {search} = this.state
    const filteredList = value.filter(each =>
      each.state_name.toLowerCase().startsWith(search.toLowerCase()),
    )

    return (
      <ul className="search-lists-con">
        {/* testId="renderStateListWhileSearch" */}
        {filteredList.map(each => (
          <Link to={`/state/${each.state_code}`}>
            <li className="search-list" key={each.state_code}>
              <p className="search-state-name">{each.state_name}</p>
              <div className="search-state-code-con">
                <p className="search-state-code">{each.state_code}</p>
                <BiChevronRightSquare
                  size={20}
                  className="BiChevronRightSquare"
                />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderUpdatedPhase = value => {
    const {search, menuOpened} = this.state

    return (
      <>
        <Header
          menuOpened={menuOpened}
          toggleMenOpened={this.toggleMenOpened}
        />
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
            {search !== '' ? this.renderStateListWhileSearch(value) : null}
          </div>
          {search === '' ? this.renderEnterNotEnterComponents(value) : null}
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <StatesListContext.Consumer>
        {value => {
          const {statesList} = value
          switch (apiStatus) {
            case apiStatusConstants.loading:
              return this.renderLoadingPhase()
            case apiStatusConstants.updated:
              return this.renderUpdatedPhase(statesList)

            default:
              return null
          }
        }}
      </StatesListContext.Consumer>
    )
  }
}

export default Home
