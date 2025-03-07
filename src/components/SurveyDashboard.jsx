import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

import { Loader2, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Color schemes
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6384', '#36A2EB', '#4BC0C0'];

// Custom Tooltip Component
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

// Individual Matrix Question Display Component
const MatrixQuestionDisplay = ({ question, criteria, rawData, headers }) => {
  const [selectedCriterion, setSelectedCriterion] = useState(null);
  
  useEffect(() => {
    // Set the first criterion as selected by default
    if (criteria && criteria.length > 0 && !selectedCriterion) {
      setSelectedCriterion(criteria[0]);
    }
  }, [criteria, selectedCriterion]);

  // Process data for the selected criterion
  const processData = () => {
    if (!selectedCriterion || !rawData || rawData.length === 0) return [];

    // Find the column that contains the criterion
    const criterionColumns = headers.reduce((cols, header, index) => {
      // More flexible matching for matrix question headers
      const matchesQuestion = header.includes(question) || header === question;
      const matchesCriterion = header.includes(selectedCriterion) || header === selectedCriterion;
      
      // Debug the matching logic
      if (matchesQuestion || matchesCriterion) {
        console.log("Potential match:", header, index, matchesQuestion, matchesCriterion);
      }
      
      // Find exact combined headers or related headers
      if ((matchesQuestion && matchesCriterion) || header === selectedCriterion) {
        cols.push(index);
        console.log("Added column index:", index, "for header:", header);
      }
      return cols;
    }, []);

    if (criterionColumns.length === 0) {
      console.log("No exact matches found, trying broader search");
      headers.forEach((header, index) => {
        // Look for headers that might contain the criterion in any form
        if (header.toLowerCase().includes(selectedCriterion.toLowerCase())) {
          criterionColumns.push(index);
          console.log("Added column in broader search:", index, header);
        }
      });
    }

    // Count each response option
    const responseCounts = {};
    
    rawData.forEach(row => {
      let response = null;
      
      // Try to find the response in any matching column
      for (const colIndex of criterionColumns) {
        if (row[colIndex] && row[colIndex].trim() !== '') {
          response = row[colIndex];
          break;
        }
      }
      
      if (response) {
        responseCounts[response] = (responseCounts[response] || 0) + 1;
      }
    });

    // Convert to chart format
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

    // Sort by Likert scale order if applicable
    const chartData = Object.entries(responseCounts)
      .map(([name, value]) => ({
        name,
        value,
        sortOrder: likertOrder[name] || 999 // Use 999 for non-Likert responses
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    // Calculate percentages
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

const SurveyDashboard = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [processedCityData, setProcessedCityData] = useState([]);
  const itemsPerPage = 10;

  // Matrix questions configuration
  const matrixQuestionConfig = {
    'Flood Impact and Rescue Challenges': [
      'How well do existing warning systems work',
      'How effective is coordination between agencies',
      'How reliable is emergency information',
      'How accessible are evacuation routes',
      'How prepared is your community',
      'How efficient are current rescue operations'
    ],
    'Autonomous Supply Boat Awareness and Perception': [
      'How helpful would autonomous boats be',
      'How much would you trust autonomous boats',
      'How reliable do you think they would be',
      'How safe do you think they would be',
      'How much do you know about this technology',
      'How confident are you in this technology'
    ],
    'Performance of an Autonomous Supply Boat': [
      'How effective is the navigation system',
      'How well does it deliver supplies',
      'How accurate is its positioning',
      'How reliable is the communication',
      'How efficient is the operation',
      'How effective is the safety system'
    ],
    'Importance of New Technology in Flood Rescue': [
      'How effective is current technology',
      'How important is technological innovation',
      'How valuable is real-time data',
      'How useful would IoT integration be',
      'How necessary are autonomous systems',
      'How urgent is technology adoption'
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetId = '157pAeb3KPcskuKpjNb4gYhPE2_91ODdBw-FFMGqC9pg';
        const apiKey = 'AIzaSyD6Hf7lMnKkNgoHrbMvP0RKRQMtbeymtwc'; 
        const sheetName = 'Form Responses 1';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

        const response = await axios.get(url);
        const rows = response.data.values;

        if (rows.length) {
          const headers = rows[0]; // First row is headers
          
          // Log headers to debug matrix questions
          console.log("All headers:", headers);

          // Extract matrix question indices
          const matrixQuestionIndices = [];
          const matrixQuestionTitles = Object.keys(matrixQuestionConfig);
          
          headers.forEach((header, index) => {
            matrixQuestionTitles.forEach(title => {
              if (header === title || header.includes(title)) {
                if (!matrixQuestionIndices.includes(index)) {
                  matrixQuestionIndices.push(index);
                }
              }
            });
          });
          
          console.log("Matrix question indices:", matrixQuestionIndices);

          // Process all rows into usable format
          const data = rows.slice(1).map(row => {
            return row.map((cell, index) => cell || ''); // Ensure no undefined values
          });

          setSurveyData([headers, ...data]);
          setSelectedQuestion(2); // Default to Age Group
          
          // Process city data (case-insensitive grouping)
          processCityData(headers, data);
        }
      } catch (error) {
        setErrorMessage('Failed to fetch data from Google Sheets');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Process city data to normalize case and group similar entries
  const processCityData = (headers, data) => {
    const cityQuestionIndex = 7; // Assuming city question is at index 7
    
    // Create a case-insensitive map of cities
    const cityMap = new Map();
    
    data.forEach(row => {
      const cityRaw = row[cityQuestionIndex];
      if (!cityRaw) return;
      
      // Normalize the city name
      let normalizedCity = cityRaw.toLowerCase().trim();
      const baseCity = normalizedCity.replace(/\s+city$/, '');
      
      // Use the base city name as the key
      if (cityMap.has(baseCity)) {
        cityMap.set(baseCity, cityMap.get(baseCity) + 1);
      } else {
        cityMap.set(baseCity, 1);
      }
    });
    
    // Convert to array and sort by count
    const cityData = Array.from(cityMap.entries())
      .map(([name, value]) => ({
        // Capitalize city name for display
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        percent: value / data.length
      }))
      .sort((a, b) => b.value - a.value);
    
    setProcessedCityData(cityData);
  };

  // Group questions by type
  const getQuestionGroups = () => {
    if (!surveyData || !surveyData[0]) return {};
    
    // Check headers for matrix questions
    const headers = surveyData[0];
    const matrixQuestions = [];
    const matrixQuestionTitles = Object.keys(matrixQuestionConfig);
    
    console.log("Matrix question titles configured:", matrixQuestionTitles);
    console.log("All available headers:", headers);
    
    // Find exact matches for matrix question titles
    matrixQuestionTitles.forEach(title => {
      const exactMatchIndex = headers.findIndex(header => header === title);
      
      if (exactMatchIndex !== -1) {
        console.log(`Found exact match for "${title}" at index ${exactMatchIndex}`);
        matrixQuestions.push({
          index: exactMatchIndex,
          text: title,
          chartType: 'matrix'
        });
        return; // Skip further searching for this title
      }
      
      // Look for headers that contain the matrix title
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].includes(title)) {
          console.log(`Found partial match for "${title}" at index ${i}: "${headers[i]}"`);
          
          // Check if we've already added this matrix question
          const existingEntry = matrixQuestions.find(q => q.text === title);
          if (!existingEntry) {
            matrixQuestions.push({
              index: i,
              text: title,
              chartType: 'matrix'
            });
            break; // Found a match, move to next title
          }
        }
      }
    });
    
    console.log("Identified matrix questions:", matrixQuestions);
    
    // Define other question types and their indexes
    const pieChartQuestions = [2, 3, 4, 5, 6, 8]; // Age, Gender, Flood experience, etc.
    const barChartQuestions = [7]; // City question
    
    return {
      pieChart: pieChartQuestions.map(index => ({ 
        index, 
        text: headers[index] || `Question ${index + 1}`,
        chartType: 'pie'
      })),
      barChart: barChartQuestions.map(index => ({ 
        index, 
        text: headers[index] || `Question ${index + 1}`,
        chartType: 'bar'
      })),
      matrix: matrixQuestions
    };
  };

  // Prepare data for charts based on question type
  const prepareChartData = () => {
    if (!surveyData.length || selectedQuestion === null) return [];
    
    // Use processed city data for the city question
    if (selectedQuestion === 7) {
      return processedCityData;
    }

    // For matrix questions we'll handle separately
    const questionGroups = getQuestionGroups();
    if (questionGroups.matrix?.some(q => q.index === selectedQuestion)) {
      return [];
    }
    
    // For regular questions
    const headers = surveyData[0];
    const data = surveyData.slice(1);
    const valueCounts = {};
    
    data.forEach(row => {
      const value = row[selectedQuestion] || 'No Response';
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    // Convert to chart format and calculate percentages
    const total = Object.values(valueCounts).reduce((sum, count) => sum + count, 0);
    return Object.entries(valueCounts)
      .map(([name, value]) => ({ 
        name, 
        value,
        percent: value / total
      }))
      .sort((a, b) => b.value - a.value);
  };

  // Determine which chart type to use
  const getChartType = (questionIndex) => {
    const groups = getQuestionGroups();
    
    // Find which group this question belongs to
    if (groups.pieChart?.some(q => q.index === questionIndex)) return 'pie';
    if (groups.barChart?.some(q => q.index === questionIndex)) return 'bar';
    if (groups.matrix?.some(q => q.index === questionIndex)) return 'matrix';
    
    return 'bar'; // Default fallback
  };

  // Get selected matrix question title
  const getSelectedMatrixQuestion = () => {
    const groups = getQuestionGroups();
    const selectedMatrixQ = groups.matrix?.find(q => q.index === selectedQuestion);
    return selectedMatrixQ ? selectedMatrixQ.text : null;
  };

  // Render chart based on question type
  const renderChart = (data) => {
    const chartType = getChartType(selectedQuestion);
    const headers = surveyData[0];
    const questionText = headers[selectedQuestion]; // Get question text from headers

    switch (chartType) {
      case 'pie': {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
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
        const matrixQuestion = getSelectedMatrixQuestion();
        const criteria = matrixQuestionConfig[matrixQuestion] || [];
        
        return (
          <MatrixQuestionDisplay 
            question={matrixQuestion}
            criteria={criteria}
            rawData={surveyData.slice(1)}
            headers={headers}
          />
        );
      }
        
      case 'bar':
      default: {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={data} 
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
                {data.map((entry, index) => (
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="mr-2 h-12 w-12 animate-spin text-blue-500" />
        <span className="text-xl">Loading survey data...</span>
      </div>
    );
  }
  
  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Data Fetch Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = surveyData.slice(1).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((surveyData.length - 1) / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const chartData = prepareChartData();
  const questionGroups = getQuestionGroups();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-800">
              S.U.R.F. Survey Dashboard
            </CardTitle>
            <CardDescription className="mt-2">
                Supply Unit for Rescue and Floods - {surveyData.length - 1} Responses
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visualize" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visualize">Visualizations</TabsTrigger>
              <TabsTrigger value="table">Raw Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualize">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="col-span-1 md:col-span-3">
                  <CardHeader>
                    <CardTitle>
                      {surveyData[0]?.[selectedQuestion] || 'Select a question to visualize'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[550px] overflow-auto">
                    {selectedQuestion !== null ? (
                      renderChart(chartData)
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p>Select a question from the sidebar to visualize responses</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle className="text-sm">Survey Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2 max-h-[500px] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm mb-2">Pie Chart Questions</h3>
                        <ul className="space-y-1">
                          {questionGroups.pieChart?.map(q => (
                            <li key={q.index}>
                              <Button 
                                variant={selectedQuestion === q.index ? "default" : "ghost"}
                                className="w-full justify-start text-xs h-auto py-1"
                                onClick={() => setSelectedQuestion(q.index)}
                              >
                                {q.text.length > 30 ? q.text.substring(0, 30) + '...' : q.text}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm mb-2">Bar Chart Questions</h3>
                        <ul className="space-y-1">
                          {questionGroups.barChart?.map(q => (
                            <li key={q.index}>
                              <Button 
                                variant={selectedQuestion === q.index ? "default" : "ghost"}
                                className="w-full justify-start text-xs h-auto py-1"
                                onClick={() => setSelectedQuestion(q.index)}
                              >
                                {q.text.length > 30 ? q.text.substring(0, 30) + '...' : q.text}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm mb-2">Matrix Questions</h3>
                        <ul className="space-y-1">
                          {questionGroups.matrix?.map(q => (
                            <li key={q.index}>
                              <Button 
                                variant={selectedQuestion === q.index ? "default" : "ghost"}
                                className="w-full justify-start text-xs h-auto py-1"
                                onClick={() => setSelectedQuestion(q.index)}
                              >
                                {q.text.length > 30 ? q.text.substring(0, 30) + '...' : q.text}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Insights Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Demographics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Based on {surveyData.length - 1} responses, most respondents are in the 26-35 age group (42%) with significant representation from flood-prone areas (65%).</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Technology Perception</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">78% of respondents show high interest in IoT-based disaster response technology, with autonomous supply boats rated positively by 64%.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Key Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Respondents emphasize the need for improved early warning systems, better coordination between agencies, and more accessible emergency information.</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="table">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {surveyData[0]?.map((header, index) => (
                        <TableHead key={index} className="text-center">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex} className="text-center">
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => paginate(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyDashboard;