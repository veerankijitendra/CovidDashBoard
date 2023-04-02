import './index.css'

const HomeTotalCases = props => {
  const {statesList, fetchedData} = props
  let totalConfirmedCases = 0
  let totalRecoveredCases = 0
  let totalDeceasedCases = 0

  statesList.forEach(state => {
    const property = state.state_code

    const {total} = fetchedData[property]
    totalConfirmedCases += total.confirmed
    totalRecoveredCases += total.recovered
    totalDeceasedCases += total.deceased
  })
  return (
    <ul className="home-total-data-con">
      <div className="home-total-data-item" testId="countryWideConfirmedCases">
        <p className="home-data-type red-color">Confirmed</p>
        <img
          src="https://res.cloudinary.com/jithu1997/image/upload/v1671471693/check-mark_1_vckoow.png"
          alt="country wide confirmed cases pic"
          className="home-total-data-icon"
        />
        <p className="home-total-data-count red-color">{totalConfirmedCases}</p>
      </div>
      <div className="home-total-data-item" testId="countryWideActiveCases">
        <p className="home-data-type blue-color">Active</p>
        <img
          src="https://res.cloudinary.com/jithu1997/image/upload/v1671471755/protection_1_in4lde.svg"
          alt="country wide active cases pic"
          className="home-total-data-icon"
        />
        <p className="home-total-data-count blue-color">
          {totalConfirmedCases - totalRecoveredCases - totalDeceasedCases}
        </p>
      </div>
      <div className="home-total-data-item" testId="countryWideRecoveredCases">
        <p className="home-data-type green-color">Recovered</p>
        <img
          src="https://res.cloudinary.com/jithu1997/image/upload/v1671471844/recovered_1_nxollz.svg"
          alt="country wide recovered cases pic"
          className="home-total-data-icon"
        />
        <p className="home-total-data-count green-color">
          {totalRecoveredCases}
        </p>
      </div>
      <div className="home-total-data-item" testId="countryWideDeceasedCases">
        <p className="home-data-type grey-color">Deceased</p>
        <img
          src="https://res.cloudinary.com/jithu1997/image/upload/v1671471815/breathing_1_dsvvpa.svg"
          alt="country wide deceased cases pic"
          className="home-total-data-icon"
        />
        <p className="home-total-data-count grey-color">{totalDeceasedCases}</p>
      </div>
    </ul>
  )
}

export default HomeTotalCases
