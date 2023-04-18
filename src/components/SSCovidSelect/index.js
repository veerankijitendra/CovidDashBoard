import './index.css'

const SSCovidSelect = props => {
  const {list, activeKey, setActiveKey} = props
  const confirmed = list[0]
  const recovered = list[2]
  const deceased = list[3]
  const active = list[1]

  const bg =
    activeKey === confirmed.id
      ? `SSCV-button bg-${confirmed.id}`
      : `SSCV-button`

  const bgRecovered =
    activeKey === recovered.id
      ? `SSCV-button bg-${recovered.id}`
      : `SSCV-button`

  const bgActive =
    activeKey === active.id ? `SSCV-button bg-${active.id}` : `SSCV-button`

  const bgDeceased =
    activeKey === deceased.id ? `SSCV-button bg-${deceased.id}` : `SSCV-button`

  return (
    <div className="SSCV-bg">
      <div
        testId="stateSpecificConfirmedCasesContainer"
        className="SSCV-list-con"
      >
        {/* dataId={testIds[activeKey]} */}
        <li
          className={bg}
          onClick={() => {
            setActiveKey('confirmed')
          }}
        >
          <p className={`SSCV-text ${confirmed.id}`}>{confirmed.text}</p>
          <img
            alt="state specific confirmed cases pic"
            src={confirmed.icon}
            className="SSCV-image"
          />
          <p className={`SSCV-count ${confirmed.id}`}>{confirmed.count}</p>
        </li>
      </div>

      <div testId="stateSpecificActiveCasesContainer" className="SSCV-list-con">
        {/* dataId={testIds[activeKey]} */}
        <li
          className={bgActive}
          onClick={() => {
            setActiveKey('active')
          }}
        >
          <p className={`SSCV-text ${active.id}`}>{active.text}</p>
          <img
            alt="state specific active cases pic"
            src={active.icon}
            className="SSCV-image"
          />
          <p className={`SSCV-count ${active.id}`}>{active.count}</p>
        </li>
      </div>

      <div
        testId="stateSpecificRecoveredCasesContainer"
        className="SSCV-list-con"
      >
        {/* dataId={testIds[activeKey]} */}
        <li
          className={bgRecovered}
          onClick={() => {
            setActiveKey('recovered')
          }}
        >
          <p className={`SSCV-text ${recovered.id}`}>{recovered.text}</p>
          <img
            alt="state specific recovered cases pic"
            src={recovered.icon}
            className="SSCV-image"
          />
          <p className={`SSCV-count ${recovered.id}`}>{recovered.count}</p>
        </li>
      </div>

      <div
        testId="stateSpecificDeceasedCasesContainer"
        className="SSCV-list-con"
      >
        {/* dataId={testIds[activeKey]} */}
        <li
          className={bgDeceased}
          onClick={() => {
            setActiveKey('deceased')
          }}
        >
          <p className={`SSCV-text ${deceased.id}`}>{deceased.text}</p>
          <img
            alt="state specific deceased cases pic"
            src={deceased.icon}
            className="SSCV-image"
          />
          <p className={`SSCV-count ${deceased.id}`}>{deceased.count}</p>
        </li>
      </div>
    </div>
  )
}

export default SSCovidSelect
