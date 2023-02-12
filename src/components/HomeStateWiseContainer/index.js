import {Component} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import {Link} from 'react-router-dom'

import './index.css'

class HomeStateWiseContainer extends Component {
  state = {isInAscendingOrder: true}

  stateListFunctionForAscendigAndDescendingOrder = (statesList, data, list) => {
    const renderedList = list.map(stateCode => {
      //   const stateNameArray = statesList.filter(
      //     each => each.state_code === stateCode,
      //   )
      const stateName = ''
      //   console.log(stateNameArray[0].state_name)
      //   console.log(property, stateName)
      //   console.log(data[property])
      const {total, meta} = data[stateCode]
      //   console.log(total, meta)
      const {population} = meta
      const {confirmed, deceased, recovered} = total
      const object = {stateName, confirmed, deceased, recovered, population}
      return object
    })
    return renderedList
  }

  renderStateComponent = () => {
    const {isInAscendingOrder} = this.state
    const {statesList, data} = this.props
    console.log(statesList.length, Object.keys(data).length)
    const list = isInAscendingOrder
      ? Object.keys(data)
      : Object.keys(data).reverse()
    const renderedList = this.stateListFunctionForAscendigAndDescendingOrder(
      statesList,
      data,
      list,
    )
    console.log(renderedList)

    return statesList.map(state => {
      const property = state.state_code
      const stateName = state.state_name
      //   console.log(property, stateName)
      //   console.log(data[property])
      const {total, meta} = data[property]
      //   console.log(total, meta)
      const {population} = meta
      const {confirmed, deceased, recovered} = total
      //   console.log(population, confirmed, deceased, recovered)

      return (
        <li key={property} className="state-wise-heading-container border-none">
          <Link to="/" className="link">
            <div className="state-name-con">
              <p>{stateName}</p>
            </div>
            <div className="state-confirmed-cases red-color">
              <p>{confirmed}</p>
            </div>
            <div className="state-confirmed-cases blue-color">
              <p>{confirmed - deceased - recovered}</p>
            </div>
            <div className="state-confirmed-cases green-color">
              <p>{recovered}</p>
            </div>
            <div className="state-confirmed-cases grey-color">
              <p>{deceased}</p>
            </div>
            <div className="state-confirmed-cases grey-color">
              <p>{population}</p>
            </div>
          </Link>
        </li>
      )
    })
  }

  ascendingOfStateList = () => {
    this.setState({isInAscendingOrder: true})
  }

  descendingStateList = () => {
    this.setState({isInAscendingOrder: false})
  }

  render() {
    return (
      <div data-testId="stateWiseCovidDataTable">
        <ul
          className="states-wise-container"
          data-testId="searchResultsUnorderedList"
        >
          <li className="state-wise-heading-container">
            <div className="state-heading-ascending-descending-order-container">
              <p className="state-heading">States/UT</p>
              <button
                type="button"
                className="state-icon-container"
                onClick={this.ascendingOfStateList}
              >
                <FcGenericSortingAsc className="state-icon" />
              </button>

              <button
                type="button"
                className="state-icon-container"
                onClick={this.descendingStateList}
              >
                <FcGenericSortingDesc className="state-icon" />
              </button>
            </div>

            <div className="state-heading-remaining-con">
              <p className="state-heading">Confirmed</p>
            </div>
            <div className="state-heading-remaining-con">
              <p className="state-heading">Active</p>
            </div>
            <div className="state-heading-remaining-con">
              <p className="state-heading">Recovered</p>
            </div>
            <div className="state-heading-remaining-con">
              <p className="state-heading">Deceased</p>
            </div>
            <div className="state-heading-remaining-con">
              <p className="state-heading">Population</p>
            </div>
          </li>
          {this.renderStateComponent()}
        </ul>
      </div>
    )
  }
}

export default HomeStateWiseContainer
