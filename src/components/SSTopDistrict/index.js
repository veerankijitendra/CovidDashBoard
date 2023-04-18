import './index.css'

const SSTopDistrict = props => {
  const getObject = (district, total, activeKey) => {
    const count = total[activeKey] !== undefined ? total[activeKey] : 0
    const object = {
      district,
      count,
    }

    return object
  }

  const getActiveObject = (district, total) => {
    const confirmed = total.confirmed !== undefined ? total.confirmed : 0
    const deceased = total.deceased !== undefined ? total.deceased : 0
    const recovered = total.recovered !== undefined ? total.recovered : 0
    const object = {
      district,
      count: confirmed - recovered - deceased,
    }

    return object
  }

  const casesList = () => {
    const {districts, activeKey} = props

    const list = []

    Object.keys(districts).forEach(district => {
      const {total} = districts[district]
      if (total === undefined) {
        return
      }
      const object =
        activeKey === 'active'
          ? getActiveObject(district, total)
          : getObject(district, total, activeKey)

      list.push(object)
    })
    // const sorting = (a, b) => {
    //     console.log(a,b)
    // }
    // console.log(list, 'district array data')

    list.sort((a, b) => b.count - a.count)

    return list
  }

  const districtWiseCases = casesList()

  return (
    <>
      <h1>Top Districts</h1>
      <ul className="sstd-bg-con" testId="topDistrictsUnorderedList">
        {districtWiseCases.map(each => (
          <li className="sstd-con" key={each.district}>
            <p className="sstd-count">{each.count}</p>
            <p className="sstd-district">{each.district}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
export default SSTopDistrict
