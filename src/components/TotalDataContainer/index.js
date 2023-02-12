import './index.css'

const TotalDataContainer = props => {
  console.log(props)

  return (
    <li className="total-data-item">
      <p className="data-type">Confirmed</p>
      <img
        src="https://res.cloudinary.com/jithu1997/image/upload/v1671471693/check-mark_1_vckoow.png"
        alt="total data icon"
        className="total-data-icon"
      />
      <p className="total-data-count"> 34285612</p>
    </li>
  )
}

export default TotalDataContainer
