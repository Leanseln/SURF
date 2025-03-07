// src/components/SurveyDashboard/index.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Import useAuth


import VisualizationTab from '../components/VIsualizationTab';
import DataTable from './DataTable';

const MATRIX_QUESTION_CONFIG = {
  'Flood Impact and Rescue Challenges': [
    'How well do emergency responders provide timely assistance in flood situations?',
    'How effective is the current flood response system in your community?',
    'How reliable is the delivery of emergency supplies during floods?',
    'How accessible are flood-affected areas for rescue teams?',
    'How prepared is your local government for flood rescue operations?',
    'How efficient are current methods of providing aid to flood victims?'
  ],
  'Autonomous Supply Boat Awareness and Perception': [
    'How helpful would an autonomous supply boat be in flood rescue efforts?',
    'How much would an autonomous supply boat improve emergency supply delivery?',
    'How reliable do you think an autonomous supply boat would be in real disaster conditions?',
    'How safe do you think an autonomous supply boat would be in flood rescue situations?',
    'How much do you support using autonomous supply boats in flood-prone areas?',
    'How confident are you that this technology can improve flood response efforts?'
  ],
  'Performance of an Autonomous Supply Boat': [
    'How effective is the boat’s ability to navigate through floodwaters?',
    'How well does the boat avoid obstacles like debris and strong currents?',
    'How accurate is the boat in delivering emergency supplies to flood victims?',
    'How reliable is the boat’s system in extreme flood conditions?',
    'How efficient is the boat in operating without human intervention?', 
    'How effective is its real-time data transmission to emergency responders?'
  ],
  'Importance of New Technology in Flood Rescue': [
    'How effective is the current supply delivery system?',
    'How important is the development of new technology for flood rescue?',
    'How valuable is real-time data in improving flood rescue efforts?',
    'How useful would AI-powered boats be in reducing response time?',
    'How necessary is government investment in autonomous flood rescue technology?',
    'How urgent is the need for autonomous technology in flood response?'
  ]
};

const SurveyDashboard = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [processedCityData, setProcessedCityData] = useState([]);

  const { logout } = useAuth(); // Get logout function from context
  const navigate = useNavigate(); // ✅ Get navigate

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
          
          // Process all rows into usable format
          const data = rows.slice(1).map(row => {
            // eslint-disable-next-line no-unused-vars
            return row.map((cell, index) => cell || ''); // Ensure no undefined values
          });

          setSurveyData([headers, ...data]);
          setSelectedQuestion(2); // Default to Age Group
          
          // Process city data
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
    const matrixQuestionTitles = Object.keys(MATRIX_QUESTION_CONFIG);
    
    // Find matrix question titles in headers
    matrixQuestionTitles.forEach(title => {
      // Look for exact match first
      const exactMatchIndex = headers.findIndex(header => header === title);
      
      if (exactMatchIndex !== -1) {
        matrixQuestions.push({
          index: exactMatchIndex,
          text: title,
          chartType: 'matrix'
        });
        return;
      }
      
      // Look for headers that contain the matrix title
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].includes(title)) {
          const existingEntry = matrixQuestions.find(q => q.text === title);
          if (!existingEntry) {
            matrixQuestions.push({
              index: i,
              text: title,
              chartType: 'matrix'
            });
            break;
          }
        }
      }
    });
    
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
          <div>
            <button
              onClick={() => logout(navigate)}
              className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visualize" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visualize">Visualizations</TabsTrigger>
              <TabsTrigger value="table">Raw Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualize">
              <VisualizationTab 
                surveyData={surveyData}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                processedCityData={processedCityData}
                getQuestionGroups={getQuestionGroups}
                matrixQuestionConfig={MATRIX_QUESTION_CONFIG}
              />
            </TabsContent>
            
            <TabsContent value="table">
              <DataTable surveyData={surveyData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyDashboard;