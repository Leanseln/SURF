import { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  // Single authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // If Firebase user exists, consider them authenticated
      if (currentUser) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        // Check if we have a manually set authentication
        const manualAuth = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(manualAuth);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with Firebase (unified login method)
  const loginWithFirebase = async (username, password, navigate) => {
    try {
      // Check for admin credentials first
      if (username === 'surfadmin' && password === 'surfproject2024!') {
        // Set authentication state for admin bypass
        setUser({ username, displayName: 'Admin User' }); // Create a minimal user object
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        
        // Navigate to dashboard
        navigate('/dashboard');
        return;
      }
      
      // If not admin credentials, attempt Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error.message);
      throw error; // Rethrow to handle in the component
    }
  };

  // Logout function
  const logout = async (navigate) => {
    try {
      // Always clear local state
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      
      // If using Firebase auth, sign out
      if (user) {
        await signOut(auth);
        setUser(null);
      }
      
      // Always navigate to login
      if (navigate) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user,
        loading,
        loginWithFirebase,
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);