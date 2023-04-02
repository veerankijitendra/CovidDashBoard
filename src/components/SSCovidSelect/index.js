import './index.css'

const testIds = {
  confirmed: 'stateSpecificConfirmedCasesContainer',
  recovered: 'stateSpecificRecoveredCasesContainer',
  deceased: 'stateSpecificDeceasedCasesContainer',
  active: 'stateSpecificActiveCasesContainer',
}

const altNames = {
  confirmed: 'state specific confirmed cases pic',
  recovered: 'state specific recovered cases pic',
  deceased: 'state specific deceased cases pic',
  active: 'state specific active cases pic',
}

const SSCovidSelect = props => {
  const {list, activeKey, setActiveKey} = props

  return (
    <div className="SSCV-bg" testId={testIds.activeKey}>
      {list.map(each => {
        const {text, icon, count, id} = each
        const bg = activeKey === id ? `SSCV-button bg-${id}` : `SSCV-button`

        return (
          <div className="SSCV-list-con" key={id}>
            {/* dataId={testIds[activeKey]} */}
            <button
              type="button"
              onClick={() => {
                setActiveKey(id)
              }}
              className={bg}
            >
              <p className={`SSCV-text ${id}`}>{text}</p>
              <img
                alt={altNames[activeKey]}
                src={icon}
                className="SSCV-image"
              />
              <p className={`SSCV-count ${id}`}>{count}</p>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default SSCovidSelect
