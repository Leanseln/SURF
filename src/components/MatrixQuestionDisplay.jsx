import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const MatrixQuestionDisplay = ({ question, criteria, rawData, headers }) => {
  const [selectedCriterion, setSelectedCriterion] = useState(null);
  
  useEffect(() => {
    if (criteria && criteria.length > 0 && !selectedCriterion) {
      setSelectedCriterion(criteria[0]);
    }
  }, [criteria, selectedCriterion]);

  const processData = () => {
    if (!selectedCriterion || !rawData || rawData.length === 0) return [];

    const cleanedHeaders = headers.map(header => header.replace(/\s+/g, ' ').trim().toLowerCase());
    const cleanedCriterion = selectedCriterion.replace(/\s+/g, ' ').trim().toLowerCase();

    console.log(cleanedHeaders, cleanedCriterion);

    const criterionColumns = cleanedHeaders.reduce((cols, header, index) => {
      if (header.includes(cleanedCriterion) || header === cleanedCriterion) {
        cols.push(index);
      }
      return cols;
    }, []);

    if (criterionColumns.length === 0) {
      cleanedHeaders.forEach((header, index) => {
        if (header.includes(cleanedCriterion)) {
          criterionColumns.push(index);
        }
      });
    }

    const responseCounts = {};
    
    rawData.forEach(row => {
      let response = null;
      for (const colIndex of criterionColumns) {
        if (row[colIndex] && row[colIndex].toString().trim() !== '') {
          response = row[colIndex].toString().trim();
          break;
        }
      }
      
      if (response) {
        responseCounts[response] = (responseCounts[response] || 0) + 1;
      }
    });

    const likertOrder = {
      "Not at all": 1, 
      "Slightly": 2, 
      "Moderately": 3, 
      "Very": 4, 
      "Extremely": 5,
      "1": 1,
      "2": 2, 
      "3": 3, 
      "4": 4, 
      "5": 5
    };

    const chartData = Object.entries(responseCounts)
      .map(([name, value]) => ({
        name,
        value,
        sortOrder: likertOrder[name] || 999 
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    chartData.forEach(item => {
      item.percentage = (item.value / total) * 100;
    });

    return chartData;
  };

  const chartData = processData();

  if (!selectedCriterion) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <p className="text-center">Loading matrix question criteria...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium">{question}</h3>
        
        <div className="w-full max-w-xs">
          <Select value={selectedCriterion} onValueChange={setSelectedCriterion}>
            <SelectTrigger>
              <SelectValue placeholder="Select a criterion" />
            </SelectTrigger>
            <SelectContent>
              {criteria.map((criterion, index) => (
                <SelectItem key={index} value={criterion}>
                  {criterion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="font-medium text-lg">{selectedCriterion}</div>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Percentage (%)', angle: 90, position: 'insideRight' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="value" name="Response Count" fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="percentage" name="Percentage (%)" fill="#82ca9d">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[(index + 4) % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
          <p>No data available for this criterion</p>
        </div>
      )}
    </div>
  );
};

MatrixQuestionDisplay.propTypes = {
  question: PropTypes.string.isRequired,
  criteria: PropTypes.array.isRequired,
  rawData: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired
};

export default MatrixQuestionDisplay;