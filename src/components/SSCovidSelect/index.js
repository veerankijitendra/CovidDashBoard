import './index.css'

const SSCovidSelect = props => {
  const {list, activeKey, setActiveKey} = props

  return (
    <ul className="SSCV-bg">
      {list.map(each => {
        const {text, icon, count, id} = each
        const bg = activeKey === id ? `SSCV-button bg-${id}` : `SSCV-button`

        return (
          <li className="SSCV-list-con" key={id}>
            <button
              type="button"
              onClick={() => {
                setActiveKey(id)
              }}
              className={bg}
            >
              <p className={`SSCV-text ${id}`}>{text}</p>
              <img alt="covid select" src={icon} className="SSCV-image" />
              <p className={`SSCV-count ${id}`}>{count}</p>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default SSCovidSelect
