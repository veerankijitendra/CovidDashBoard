import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts'

const color = {
  confirmed: '#9A0E31',
  active: '#0A4FA0',
  deceased: '#474C57',
  recovered: '#216837',
}

const SSBarGraph = props => {
  const {data, activeKey} = props

  const dataFormater = number => {
    if (number >= 1000) {
      return `${number / 1000}k`
    }
    return number
  }

  const activeCardList = data[activeKey]
  const lastTenDaysData = activeCardList.slice(activeCardList.length - 10)

  lastTenDaysData.sort((a, b) => b.count - a.count)

  return (
    <BarChart width={600} height={400} data={lastTenDaysData}>
      <XAxis dataKey="date" />
      <YAxis hide dataKey="count" tickFormatter={dataFormater} />
      <Tooltip />
      <Legend />
      <Bar
        barSize={30}
        dataKey="count"
        fill={color[activeKey]}
        className="bar"
        label={{
          position: 'top',
          fill: color[activeKey],
          fontSize: 12,
          offset: 12,
        }}
      />
    </BarChart>
  )
}

export default SSBarGraph
