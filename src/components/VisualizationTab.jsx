import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ChartDisplay from './ChartDisplay';
import QuestionSidebar from './QuestionSidebar';

const VisualizationTab = ({ 
  // eslint-disable-next-line react/prop-types
  surveyData, 
  // eslint-disable-next-line react/prop-types
  selectedQuestion, 
  // eslint-disable-next-line react/prop-types
  setSelectedQuestion, 
  // eslint-disable-next-line react/prop-types
  processedCityData,
  // eslint-disable-next-line react/prop-types
  getQuestionGroups,
  // eslint-disable-next-line react/prop-types
  matrixQuestionConfig
}) => {
  // Prepare data for charts based on question type
  const prepareChartData = () => {
    // eslint-disable-next-line react/prop-types
    if (!surveyData.length || selectedQuestion === null) return [];
    
    // Use processed city data for the city question
    if (selectedQuestion === 7) {
      return processedCityData;
    }
    const questionGroups = getQuestionGroups();
    if (questionGroups.matrix?.some(q => q.index === selectedQuestion)) {
      return [];
    }
    
    // For regular questions
    // eslint-disable-next-line react/prop-types
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
    
    return 'bar'; 
  };

  // Get selected matrix question title
  const getSelectedMatrixQuestion = () => {
    const groups = getQuestionGroups();
    const selectedMatrixQ = groups.matrix?.find(q => q.index === selectedQuestion);
    return selectedMatrixQ ? selectedMatrixQ.text : null;
  };

  const chartData = prepareChartData();
  const questionGroups = getQuestionGroups();
  const chartType = getChartType(selectedQuestion);
  const matrixQuestion = getSelectedMatrixQuestion();
  const criteria = matrixQuestion ? matrixQuestionConfig[matrixQuestion] || [] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="col-span-1 md:col-span-3">
        <CardHeader>
          <CardTitle>
            {surveyData[0]?.[selectedQuestion] || 'Select a question to visualize'}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[550px] overflow-auto">
          {selectedQuestion !== null ? (
            <ChartDisplay
              chartType={chartType}
              chartData={chartData}
              matrixQuestion={matrixQuestion}
              criteria={criteria}
              // eslint-disable-next-line react/prop-types
              rawData={surveyData.slice(1)}
              headers={surveyData[0]}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p>Select a question from the sidebar to visualize responses</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <QuestionSidebar
        questionGroups={questionGroups}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
      />
    </div>
  );
};

export default VisualizationTab;