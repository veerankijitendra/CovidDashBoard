import {LineChart, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

import './index.css'

const color = {
  confirmed: '#9A0E31',
  active: '#0A4FA0',
  deceased: '#474C57',
  recovered: '#216837',
  tested: '#9673B9',
}

const SSLineGraph = props => {
  const {data} = props

  const dataFormater = number => {
    if (number >= 1000) {
      return `${number / 1000}k`
    }
    return number
  }

  const {confirmed, active, deceased, tested, recovered} = data
  console.log(tested)

  return (
    <>
      <div className="SSLG-confirmed">
        <p className="SSLG-para-confirmed">Confirmed</p>
        <LineChart
          width={600}
          height={250}
          data={confirmed}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{stroke: color.confirmed, strokeWidth: 0.5}}
          />
          <YAxis
            dataKey="count"
            tickFormatter={dataFormater}
            tick={{stroke: color.confirmed, strokeWidth: 0.5}}
          />
          <Tooltip />
          <Legend />
          <Line
            legendType="none"
            dot={{stroke: color.confirmed, strokeWidth: 2}}
            type="monotone"
            dataKey="count"
            stroke={color.confirmed}
            strokeWidth={2}
          />
        </LineChart>
      </div>

      <div className="SSLG-active">
        <p className="SSLG-para-active">Total Active</p>
        <LineChart
          width={600}
          height={250}
          data={active}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{stroke: color.active, strokeWidth: 0.5}}
          />
          <YAxis
            dataKey="count"
            tickFormatter={dataFormater}
            tick={{stroke: color.active, strokeWidth: 0.5}}
          />
          <Tooltip />
          <Legend />
          <Line
            legendType="none"
            dot={{stroke: color.active, strokeWidth: 2}}
            type="monotone"
            dataKey="count"
            stroke={color.acitve}
            strokeWidth={2}
          />
        </LineChart>
      </div>

      <div className="SSLG-recovered">
        <p className="SSLG-para-recovered">Recovered</p>
        <LineChart
          width={600}
          height={250}
          data={recovered}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{stroke: color.recovered, strokeWidth: 0.5}}
          />
          <YAxis
            dataKey="count"
            tickFormatter={dataFormater}
            tick={{stroke: color.recovered, strokeWidth: 0.5}}
          />
          <Tooltip />
          <Legend />
          <Line
            legendType="none"
            dot={{stroke: color.recovered, strokeWidth: 2}}
            type="monotone"
            dataKey="count"
            stroke={color.recovered}
            strokeWidth={2}
          />
        </LineChart>
      </div>

      <div className="SSLG-deceased">
        <p className="SSLG-para-deceased">Deceased</p>
        <LineChart
          width={600}
          height={250}
          data={deceased}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{stroke: color.deceased, strokeWidth: 0.5}}
          />
          <YAxis
            dataKey="count"
            tickFormatter={dataFormater}
            tick={{stroke: color.deceased, strokeWidth: 0.5}}
          />
          <Tooltip />
          <Legend />
          <Line
            legendType="none"
            dot={{stroke: color.deceased, strokeWidth: 2}}
            type="monotone"
            dataKey="count"
            stroke={color.deceased}
            strokeWidth={2}
          />
        </LineChart>
      </div>

      <div className="SSLG-tested">
        <p className="SSLG-para-tested">Tested</p>
        <LineChart
          width={600}
          height={250}
          data={tested}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            tick={{stroke: color.tested, strokeWidth: 0.5}}
          />
          <YAxis
            dataKey="count"
            tickFormatter={dataFormater}
            tick={{stroke: color.tested, strokeWidth: 0.5}}
          />
          <Tooltip />
          <Legend />
          <Line
            legendType="none"
            dot={{stroke: color.tested, strokeWidth: 2}}
            type="monotone"
            dataKey="count"
            stroke={color.tested}
            strokeWidth={2}
          />
        </LineChart>
      </div>
    </>
  )
}

export default SSLineGraph
