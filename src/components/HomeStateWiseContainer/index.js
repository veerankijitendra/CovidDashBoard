import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import {Link} from 'react-router-dom'

import {useContext} from 'react'

import StatesListContext from '../../context/statesListContext'

import './index.css'

const HomeStateWiseContainer = props => {
  const value = useContext(StatesListContext)
  const {setAscending, isAscending} = value

  let array

  const sorting = arr => {
    if (!isAscending) {
      array = []
      for (let x = arr.length - 1; x >= 0; x -= 1) {
        array.push(arr[x])
      }
      return array
    }
    return arr
  }

  const renderStateComponent = () => {
    const {data} = props
    // console.log(data)
    const list = sorting(data)

    return list.map(each => {
      //   const property = each.state_code
      //   const stateName = each.state_name
      //   //   console.log(property, stateName)
      //   //   console.log(data[property])
      //   const {total, meta} = data[property]
      //   //   console.log(total, meta)
      //   const {population} = meta
      //   const {confirmed, deceased, recovered} = total
      //   //   console.log(population, confirmed, deceased, recovered)
      const {stateCode, name, confirmed, deceased, recovered, population} = each

      if (name === null) {
        return null
      }

      return (
        <Link to={`/state/${stateCode}`} className="link" key={stateCode}>
          <li className="state-wise-heading-container border-none">
            <div className="state-name-con">
              <p>{name}</p>
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
          </li>
        </Link>
      )
    })
  }

  const ascendingOfStateList = () => {
    setAscending(true)
  }

  const descendingStateList = () => {
    setAscending(false)
  }

  return (
    <div testId="stateWiseCovidDataTable">
      <ul className="states-wise-container">
        <li className="state-wise-heading-container">
          <div className="state-heading-ascending-descending-order-container">
            <p className="state-heading">States/UT</p>
            <button
              testId="ascendingSort"
              type="button"
              className="state-icon-container"
              onClick={ascendingOfStateList}
            >
              <FcGenericSortingAsc className="state-icon" />
            </button>

            <button
              testId="descendingSort"
              type="button"
              className="state-icon-container"
              onClick={descendingStateList}
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
        {renderStateComponent()}
      </ul>
    </div>
  )
}

export default HomeStateWiseContainer
