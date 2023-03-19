import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {VaccinationByGenderData} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="70%"
        cy="40%"
        data={VaccinationByGenderData}
        startAngle={0}
        endAngle={180}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Male" fill="#2d87bb" />
        <Cell name="Female" fill=" #5a8dee" />
        <Cell name="Others" fill="#f54394" />
      </Pie>
      <Legend
        iconType="circle"
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
    </PieChart>
  )
}

export default VaccinationByGender
