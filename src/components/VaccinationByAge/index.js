// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeListData} = props

  return (
    <div className="vaccination-by-container">
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          startAngle={0}
          endAngle={360}
          data={vaccinationByAgeListData}
          outerRadius="100"
          dataKey="count"
        >
          <Cell name="18-44" fill=" #2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{padding: 10}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
