import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Creating a context with a default value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Creating a UserProvider component
export const UserProvider = (props) => {
  // Initializing state for currentUser and setCurrentUser with null value
  const [currentUser, setCurrentUser] = useState(null);

  // Creating a value object containing currentUser and setCurrentUser
  const value = { currentUser, setCurrentUser };

  // Using useEffect to listen to user authentication changes
  useEffect(() => {
    // Initializing an unsubscribe function to remove the listener when the component unmounts
    const unsubscribe = onAuthStateChangedListener((user) => {
      // If the user is authenticated, create a document for them in the database
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // Set the currentUser state to the authenticated user or null if not authenticated
      setCurrentUser(user);
    });

    // Returning the unsubscribe function to remove the listener when the component unmounts
    return unsubscribe;
  }, []);

  // Rendering the UserContext Provider with the value object and the props' children
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
