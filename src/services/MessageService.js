import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy, 
    doc, 
    updateDoc, 
    deleteDoc,
    where,
    Timestamp 
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  
  const MESSAGES_COLLECTION = 'messages';
  
  // Add a new message to Firestore
  export const addMessage = async (messageData) => {
    try {
      const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
        ...messageData,
        read: false,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding message: ", error);
      throw error;
    }
  };
  
  // Get all messages
  export const getAllMessages = async () => {
    try {
      const q = query(
        collection(db, MESSAGES_COLLECTION), 
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error getting messages: ", error);
      throw error;
    }
  };
  
  // Get unread messages
  export const getUnreadMessages = async () => {
    try {
      const q = query(
        collection(db, MESSAGES_COLLECTION),
        where("read", "==", false),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error getting unread messages: ", error);
      throw error;
    }
  };
  
  // Mark message as read
  export const markMessageAsRead = async (messageId) => {
    try {
      const messageRef = doc(db, MESSAGES_COLLECTION, messageId);
      await updateDoc(messageRef, {
        read: true,
        readAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error("Error marking message as read: ", error);
      throw error;
    }
  };
  
  // Delete a message
  export const deleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, MESSAGES_COLLECTION, messageId));
      return true;
    } catch (error) {
      console.error("Error deleting message: ", error);
      throw error;
    }
  };