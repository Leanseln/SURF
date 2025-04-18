import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from '../src/components/Login';
import UnifiedDashboard from './components/AdminDashboard';
import Home from './Home';
import { Loader2 } from 'lucide-react';

// Protected route component
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
      return <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading...</span>
      </div>;
    }
    
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };

function App() {
  return (
    <Router>
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={<Home />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UnifiedDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect old dashboard routes to the new unified dashboard */}
        <Route path="/messages" element={<Navigate to="/dashboard" />} />
        <Route path="/survey" element={<Navigate to="/dashboard" />} />
        
        {/* Add a catch-all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;