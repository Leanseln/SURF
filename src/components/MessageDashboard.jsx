// src/pages/MessageDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllMessages, markMessageAsRead, deleteMessage } from '../services/MessageService';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MoreHorizontal, 
  Trash2, 
  Eye, 
  Mail, 
  Search, 
  Loader2,
  MailOpen,
  AlertTriangle,
  Check
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast, Toaster } from 'sonner';

const MessageDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Fetch messages from Firebase
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const data = await getAllMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
        // Update the message in the local state
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
      
      // If the deleted message was the selected one, close the message view
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-800">
              Message Dashboard
            </CardTitle>
            <CardDescription className="mt-2">
              Manage contact form submissions
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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
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
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Check className="h-3 w-3" /> Read
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-500 flex items-center gap-1">
                              <Mail className="h-3 w-3" /> Unread
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
        </CardContent>
      </Card>

      {/* Message View Dialog */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        {selectedMessage && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage.firstName} {selectedMessage.lastName}</DialogTitle>
              <DialogDescription>
                <div className="mt-2 flex flex-col gap-1">
                  <span>
                    <span className="font-medium">Email:</span> {selectedMessage.email}
                  </span>
                  <span>
                    <span className="font-medium">Phone:</span> {selectedMessage.phone || 'Not provided'}
                  </span>
                  <span>
                    <span className="font-medium">Received:</span> {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 border-t pt-4">
              <h4 className="font-medium mb-2">Message:</h4>
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
              <Button
                variant="outline"
                onClick={() => setIsMessageOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteClick(selectedMessage);
                  setIsMessageOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
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

export default MessageDashboard;