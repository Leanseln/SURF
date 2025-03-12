import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
  } from 'firebase/auth';
  import { auth } from '../config/firebase';
  
  // Admin sign in
  export const adminSignIn = async (username, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in: ", error);
      throw error;
    }
  };
  
  // Sign out
  export const signOutAdmin = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Error signing out: ", error);
      throw error;
    }
  };
  
  // Auth state observer
  export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
  };
  
  // Get current user
  export const getCurrentUser = () => {
    return auth.currentUser;
  };