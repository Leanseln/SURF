// src/components/SurveyDashboard/ChartDisplay.jsx
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';
import MatrixQuestionDisplay from './MatrixQuestionDisplay';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6384', '#36A2EB', '#4BC0C0'];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-bold">{label || payload[0].name}</p>
        <p>Count: {payload[0].value}</p>
        <p>Percentage: {payload[0].percent ? (payload[0].percent * 100).toFixed(2) + '%' : 'N/A'}</p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    percent: PropTypes.number,
    name: PropTypes.string,
  })),
  label: PropTypes.string,
};

const ChartDisplay = ({ chartType, chartData, matrixQuestion, criteria, rawData, headers }) => {
  switch (chartType) {
    case 'pie': {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
      
    case 'matrix': {
      return (
        <MatrixQuestionDisplay 
          question={matrixQuestion}
          criteria={criteria}
          rawData={rawData}
          headers={headers}
        />
      );
    }
      
    case 'bar':
    default: {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end"
              interval={0}
              height={100}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }
};

ChartDisplay.propTypes = {
  chartType: PropTypes.oneOf(['pie', 'bar', 'matrix']).isRequired,
  chartData: PropTypes.array.isRequired,
  matrixQuestion: PropTypes.string,
  criteria: PropTypes.array,
  rawData: PropTypes.array,
  headers: PropTypes.array
};

export default ChartDisplay;