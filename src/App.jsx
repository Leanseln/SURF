import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from '../src/components/Login';
import UnifiedDashboard from '../src/components/SurveyDashboard';
import Home from './Home';
import Features from './components/Features';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
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
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        
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