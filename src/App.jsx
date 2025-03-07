import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PropTypes from 'prop-types';
import Home from "./Home";
import Login from "./components/Login";
import SurveyDashboard from './components/SurveyDashboard';

function App() {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const ProtectedRoute = ({ children }) => {
        const isAuthenticated = 
          localStorage.getItem('dashboardAccess') === 'true';

        return isAuthenticated ? 
          children : 
          <Navigate to="/login" replace />;
    };

    ProtectedRoute.propTypes = {
        children: PropTypes.node.isRequired,
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <SurveyDashboard />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        </GoogleOAuthProvider> 
    );
}

export default App;