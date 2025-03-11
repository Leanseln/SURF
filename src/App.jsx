import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./Home";
import Login from "./components/Login";
import SurveyDashboard from "./components/SurveyDashboard";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
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
    );
}

export default App;