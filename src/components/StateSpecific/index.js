import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import SSCovidSelect from '../SSCovidSelect'
import SSTopDistrict from '../SSTopDistrict'
import SSBarGraph from '../SSBarGraph'

import StatesListContext from '../../context/statesListContext'
import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  updated: 'UPDATED',
}

const icons = {
  confirmed:
    'https://res.cloudinary.com/jithu1997/image/upload/v1671471693/check-mark_1_vckoow.png',
  active:
    'https://res.cloudinary.com/jithu1997/image/upload/v1671471755/protection_1_in4lde.svg',
  recovered:
    'https://res.cloudinary.com/jithu1997/image/upload/v1671471844/recovered_1_nxollz.svg',
  deceased:
    'https://res.cloudinary.com/jithu1997/image/upload/v1671471815/breathing_1_dsvvpa.svg',
}

const covidSelectKeys = {
  confirmed: 'confirmed',
  active: 'active',
  recovered: 'recovered',
  deceased: 'deceased',
}

class StateSpecific extends Component {
  state = {
    apiStatus: apiStatusConstants.loading,
    fetchedData: {},
    activeKey: covidSelectKeys.confirmed,
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    // const {match} = this.props
    // const {params} = match
    // const {stateCode} = params
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
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

  getLastUpdatedDate = updatedDate => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const d = new Date(updatedDate)
    const year = d.getFullYear()
    const month = months[d.getMonth()]

    const day = d.getDate()
    let date = null
    switch (day) {
      case 1:
        date = `${day}st`
        break
      case 2:
        date = `${day}nd`
        break
      case 3:
        date = `${day}rd`
        break
      default:
        date = `${date}th`
        break
    }

    const lastUpdated = `Last update on ${month.toLowerCase()} ${date} ${year}.`

    return lastUpdated
  }

  createCovidSelectList = details => {
    const array = [
      {
        id: 'confirmed',
        text: 'Confirmed',
        icon: icons.confirmed,
        count: details.confirmed,
      },
      {
        id: 'active',
        text: 'Active',
        icon: icons.active,
        count: details.confirmed - details.deceased - details.recovered,
      },
      {
        id: 'recovered',
        text: 'Recovered',
        icon: icons.recovered,
        count: details.recovered,
      },
      {
        id: 'deceased',
        text: 'Deceased',
        icon: icons.deceased,
        count: details.deceased,
      },
    ]

    return array
  }

  setActiveKey = id => {
    this.setState({activeKey: id})
  }

  specificStateDetails = (stateName, stateCode) => {
    const {fetchedData, activeKey} = this.state
    const covidDetails = fetchedData[stateCode]
    const {meta, total} = covidDetails

    const lastUpdate = this.getLastUpdatedDate(meta.last_updated)

    const covidSelectList = this.createCovidSelectList(total)
    console.log(covidDetails)

    return (
      <>
        <>
          <div className="ss-state-name-tested-last-up-date-con">
            <div>
              <div className="ss-state-name-con">
                <p className="ss-state-name">{stateName}</p>
              </div>
              <p className="ss-last-update-date">{lastUpdate}</p>
            </div>

            <div className="ss-tested-para-count-con">
              <p className="ss-tested-para">Tested</p>
              <p className="ss-tested-count">{total.tested}</p>
            </div>
          </div>
        </>
        <SSCovidSelect
          setActiveKey={this.setActiveKey}
          activeKey={activeKey}
          list={covidSelectList}
        />
        <SSTopDistrict
          activeKey={activeKey}
          districts={{...covidDetails.districts}}
        />
        <SSBarGraph activeKey={activeKey} />
      </>
    )
  }

  getStateName = (list, code) => {
    let stateName = null
    list.forEach(each => {
      if (each.state_code === code) {
        stateName = each.state_name
      }
    })
    return stateName
  }

  getStateCode = () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    return stateCode
  }

  renderUpdatedPhase = () => (
    <StatesListContext.Consumer>
      {value => {
        const {statesList} = value
        const stateCode = this.getStateCode()
        const stateName = this.getStateName(statesList, stateCode)

        return (
          <div className="specific-state-bg">
            <Header />
            <div className="ss-responsive-con">
              {this.specificStateDetails(stateName, stateCode)}
            </div>

            <Footer />
          </div>
        )
      }}
    </StatesListContext.Consumer>
  )

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

export default StateSpecific
