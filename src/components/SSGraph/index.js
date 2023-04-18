import {Component} from 'react'

import {withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import SSBarGraph from '../SSBarGraph'
import SSLineGraph from '../SSLineGraph'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  updated: 'UPDATED',
  failed: 'FAILED',
}

class SSGraph extends Component {
  state = {apiStatus: apiStatusConstants.loading, data: {}}

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
    // console.log(data)

    if (data.error_msg === undefined) {
      const {dates} = data[stateCode]
      //   console.log(dates, 'jithu')

      const confirmed = []
      const deceased = []
      const active = []
      const recovered = []
      const tested = []

      Object.keys(dates).forEach(date => {
        const {total} = dates[date]

        //   const {confirmed, deceased, recovered, tested} = total

        //   const object = {
        //     date,
        //     confirmed,
        //     deceased,
        //     recovered,
        //     active: confirmed - deceased - recovered,
        //     tested,
        //   }
        const object1 = {date, count: total.confirmed}
        const object2 = {date, count: total.deceased}
        const object3 = {date, count: total.recovered}
        const object4 = {
          date,
          count: total.confirmed - (total.deceased + total.recovered),
        }

        const object5 = {date, count: total.tested}

        confirmed.push(object1)
        deceased.push(object2)
        recovered.push(object3)
        active.push(object4)
        tested.push(object5)
      })

      const list = {confirmed, active, recovered, deceased, tested}
      //   console.log(list, 'finalList')

      this.setState({
        data: {...list},
        apiStatus: apiStatusConstants.updated,
      })
    } else {
      const value = [{date: '', count: 0}]
      const list = {
        confirmed: value,
        active: value,
        recovered: value,
        deceased: value,
        tested: value,
      }
      this.setState({
        data: {...list},
        apiStatus: apiStatusConstants.updated,
      })
      //   this.setState({
      //     apiStatus: apiStatusConstants.failed,
      //   })
    }
  }

  renderUpdatedPhase = () => {
    const {activeKey} = this.props
    const {data} = this.state
    return (
      <>
        <SSBarGraph data={data} activeKey={activeKey} />
        <SSLineGraph data={data} />
      </>
    )
  }

  renderLoadingPhase = () => (
    <ul>
      <div className="ssbg-container" testId="timelinesDataLoader">
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

export default withRouter(SSGraph)
