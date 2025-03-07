// src/components/SurveyDashboard/QuestionSidebar.jsx
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuestionSidebar = ({ questionGroups, selectedQuestion, setSelectedQuestion }) => {
  return (
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
  );
};

QuestionSidebar.propTypes = {
  questionGroups: PropTypes.object.isRequired,
  selectedQuestion: PropTypes.number,
  setSelectedQuestion: PropTypes.func.isRequired
};

export default QuestionSidebar;