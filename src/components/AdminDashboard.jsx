/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllMessages, markMessageAsRead, deleteMessage } from '../services/MessageService';
import { formatDistanceToNow } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  MoreHorizontal, 
  Trash2, 
  Eye, 
  Search, 
  Loader2,
  MailOpen,
  AlertTriangle,
  MessageSquare,
  BarChart,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import VisualizationTab from './VisualizationTab';
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
    "How effective is the boat's ability to navigate through floodwaters?",
    'How well does the boat avoid obstacles like debris and strong currents?',
    'How accurate is the boat in delivering emergency supplies to flood victims?',
    "How reliable is the boat's system in extreme flood conditions?",
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
  // Message Dashboard state
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  
  // Survey Dashboard state
  const [surveyData, setSurveyData] = useState([]);
  const [isSurveyLoading, setIsSurveyLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [processedCityData, setProcessedCityData] = useState([]);
  const [respondentCount, setRespondentCount] = useState(0);
  
  // General state
  const [activeTab, setActiveTab] = useState('messages');
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Fetch messages from Firebase
  const fetchMessages = async () => {
    setIsMessagesLoading(true);
    try {
      const data = await getAllMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsMessagesLoading(false);
    }
  };

  // Fetch survey data
  const fetchSurveyData = async () => {
    setIsSurveyLoading(true);
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
          return row.map((cell) => cell || ''); 
        });

        setSurveyData([headers, ...data]);
        setSelectedQuestion(2);
        
        // Set respondent count
        setRespondentCount(data.length);
        
        // Process city data
        processCityData(headers, data);
      }
    } catch (error) {
      setErrorMessage('Failed to fetch data from Google Sheets');
      console.error(error);
    } finally {
      setIsSurveyLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchSurveyData();
  }, []);

  // Process city data to normalize case and group similar entries
  const processCityData = (headers, data) => {
    const cityQuestionIndex = 7;
    
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
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        percent: value / data.length
      }))
      .sort((a, b) => b.value - a.value);
    
    setProcessedCityData(cityData);
  };

  // Group questions by type for survey visualization
  const getQuestionGroups = () => {
    if (!surveyData || !surveyData[0]) return {};
    
    // Check headers for matrix questions
    const headers = surveyData[0];
    const matrixQuestions = [];
    const matrixQuestionTitles = Object.keys(MATRIX_QUESTION_CONFIG);
    
    // Find matrix question titles in headers
    matrixQuestionTitles.forEach(title => {
      const exactMatchIndex = headers.findIndex(header => header === title);
      
      if (exactMatchIndex !== -1) {
        matrixQuestions.push({
          index: exactMatchIndex,
          text: title,
          chartType: 'matrix'
        });
        return;
      }
      
      // Headers that contain the matrix title
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
    
    const pieChartQuestions = [2, 3, 4, 5, 6, 8];
    const barChartQuestions = [7];
    
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

  // Filter messages based on search term
  const filteredMessages = messages.filter(message => {
    const searchFields = [
      message.firstName,
      message.lastName,
      message.email,
      message.message
    ].join(' ').toLowerCase();
    
    return searchFields.includes(searchTerm.toLowerCase());
  });

  // Handle viewing a message
  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setIsMessageOpen(true);
    
    // Mark as read if it's unread
    if (!message.read) {
      try {
        await markMessageAsRead(message.id);
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === message.id ? { ...msg, read: true } : msg
          )
        );
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  // Handle deleting a message
  const handleDeleteClick = (message) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    
    try {
      await deleteMessage(messageToDelete.id);
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== messageToDelete.id)
      );
      toast.success('Message deleted successfully');
      setIsDeleteDialogOpen(false);
      
      if (selectedMessage && selectedMessage.id === messageToDelete.id) {
        setIsMessageOpen(false);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  // Count unread messages
  const unreadCount = messages.filter(msg => !msg.read).length;

  const renderLoadingState = (type) => (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <span className="ml-2">Loading {type} data...</span>
    </div>
  );

  // Respondent Counter Card Component
  // eslint-disable-next-line react/prop-types
  const RespondentCounter = ({ count }) => (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-80">Total Survey Respondents</p>
            <h2 className="text-3xl font-bold">{count}</h2>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-500 bg-opacity-30 flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-400 flex p-4 sm:p-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-800">
              S.U.R.F. Admin Dashboard
            </CardTitle>
            <CardDescription className="mt-2">
              Manage all project data from one centralized location
            </CardDescription>
          </div>
          <Button
            onClick={() => logout(navigate)}
            className="bg-blue-800 text-white hover:bg-red-700 transition duration-300"
          >
            Logout
          </Button>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue="messages" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="messages" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages {unreadCount > 0 && (
                  <Badge className="ml-2 bg-blue-500">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="survey" className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                Survey Data
              </TabsTrigger>
            </TabsList>
            
            {/* Messages Tab Content */}
            <TabsContent value="messages">
              <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {messages.length} total messages
                  </span>
                  {unreadCount > 0 && (
                    <Badge className="bg-blue-500">
                      {unreadCount} unread
                    </Badge>
                  )}
                </div>
              </div>
              
              {isMessagesLoading ? (
                renderLoadingState("message")
              ) : filteredMessages.length === 0 ? (
                <div className="text-center py-12">
                  <MailOpen className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No messages found</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-gray-50">
                          <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                            From
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 hidden md:table-cell">
                            Message
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                            Received
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                            Status
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredMessages.map((message) => (
                          <tr 
                            key={message.id}
                            className={`border-b transition-colors hover:bg-gray-50 cursor-pointer ${
                              !message.read ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => handleViewMessage(message)}
                          >
                            <td className="p-4 align-middle font-medium">
                              <div className="flex flex-col">
                                <span>{message.firstName} {message.lastName}</span>
                                <span className="text-xs text-gray-500">{message.email}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle truncate max-w-xs hidden md:table-cell">
                              {message.message.length > 60 
                                ? `${message.message.substring(0, 60)}...` 
                                : message.message}
                            </td>
                            <td className="p-4 align-middle text-sm text-gray-500">
                              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                            </td>
                            <td className="p-4 align-middle">
                              {message.read ? (
                                <Badge variant="outline" className="flex items-center gap-1 w-fit text-md ">
                                  Read
                                </Badge>
                              ) : (
                                <Badge className="bg-blue-500 flex items-center gap-1 w-fit text-md">
                                  Unread
                                </Badge>
                              )}
                            </td>
                            <td className="p-4 align-middle text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewMessage(message);
                                  }}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClick(message);
                                    }}
                                    className="text-red-600 focus:text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Survey Tab Content */}
            <TabsContent value="survey">
              {isSurveyLoading ? (
                renderLoadingState("survey")
              ) : errorMessage ? (
                // eslint-disable-next-line react/jsx-no-undef
                <Alert variant="destructive" className="max-w-md mx-auto">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Data Fetch Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              ) : (
                <>
                  {/* Respondent Counter Card */}
                  <RespondentCounter count={respondentCount} />
                  
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
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>


      {/* Message View Dialog */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        {selectedMessage && (
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto w-[95vw]">
            <DialogHeader>
              <DialogTitle className="text-xl break-words">
                Message from {selectedMessage.firstName} {selectedMessage.lastName}
              </DialogTitle>
              <DialogDescription>
                <div className="mt-2 flex flex-col gap-1">
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="font-medium">Email:</span> 
                    <span className="break-all">{selectedMessage.email}</span>
                  </span>
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="font-medium">Phone:</span> 
                    <span>{selectedMessage.phone || 'Not provided'}</span>
                  </span>
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="font-medium">Received:</span> 
                    <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 border-t pt-4">
              <h4 className="font-medium mb-2">Message:</h4>
              <div className="whitespace-pre-wrap break-words max-h-[40vh] overflow-y-auto p-2 bg-gray-50 rounded-md">
                {selectedMessage.message}
              </div>
            </div>
            <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
              <Button
                variant="outline"
                onClick={() => setIsMessageOpen(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteClick(selectedMessage);
                  setIsMessageOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default SurveyDashboard;