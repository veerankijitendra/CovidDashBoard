import {Component} from 'react'

import {withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  updated: 'UPDATED',
}

class SSBarGraph extends Component {
  state = {apiStatus: apiStatusConstants.loading, data: []}

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {dates} = data

    const list = []

    Object.keys(dates).forEach(date => {
      const {total} = date
      const {confirmed, deceased, recovered, tested} = total

      const object = {
        date,
        confirmed,
        deceased,
        recovered,
        tested,
      }

      list.push(object)
    })

    console.log(list)

    this.setState({
      data: [...list],
      apiStatus: apiStatusConstants.updated,
    })
  }

  renderUpdatedPhase = () => <h1>Bar Graph</h1>

  renderLoadingPhase = () => (
    <ul>
      <div className="ssbg-container">
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

export default withRouter(SSBarGraph)
