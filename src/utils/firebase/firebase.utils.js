// import necessary Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCN1D_tid9Bm_8HIIMhKUSyAYLlcahUeT4",
  authDomain: "pf-shop-db.firebaseapp.com",
  projectId: "pf-shop-db",
  storageBucket: "pf-shop-db.appspot.com",
  messagingSenderId: "559665893431",
  appId: "1:559665893431:web:2fbabf1aa0b9f012462fb2",
};

// Initialize Firebase with the configuration object
const firebaseApp = initializeApp(firebaseConfig);

// Create a new GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();

// Set the custom parameters for the GoogleAuthProvider
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Get the auth and firestore instances from the Firebase app instance
export const auth = getAuth();
export const db = getFirestore();

// Google Popup and Redirect
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Function to add a collection and documents to the firestore database
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // Create a new batch instance
  const batch = writeBatch(db);

  // Get a reference to the collection
  const collectionRef = collection(db, collectionKey);

  // Loop through each object and add it to the batch
  objectsToAdd.forEach((object) => {
    // Create a new document reference for the object
    const docRef = doc(collectionRef, object.title.toLowerCase());

    // Add the object to the batch
    batch.set(docRef, object);
  });

  // Commit the batch to the firestore database
  await batch.commit();
  console.log("done");
};

// Retrieve all the documents from the 'categories' collection in the db
export const getCategoriesAndDocuments = async () => {
  // Reference to the 'categories' collection in the db
  const collectionRef = collection(db, "categories");

  // Query to retrieve all documents in the collection
  const q = query(collectionRef);

  // Retrieve docs and wait for the result
  const querySnapshot = await getDocs(q);

  // Create a map of category names to their respective items using the query results
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    // Extract the 'title' and 'items' fields from the document data
    const { title, items } = docSnapshot.data();
    // Add an entry to the map where the key is the title and the value is the items array
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  // Return the final categoryMap
  return categoryMap;
};

// Function to create a user document in the users collection when a user logs in
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Check if the user is authenticated
  if (!userAuth) return;

  // Get a reference to the user document
  const userDocRef = doc(db, "users", userAuth.uid);

  // Get the user snapshot
  const userSnapshot = await getDoc(userDocRef);

  // If the user document doesn't exist, create a new one
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Set the user document with the user information
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // Return the user document reference
  return userDocRef;
};

// Function to create a new user account with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // check if email and password are present
  if (!email || !password) return;

  // create a user with the given email and password
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // check if email and password are present
  if (!email || !password) return;

  // sign in the user with the given email and password
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  // listen to changes in the authentication state and call the callback function
  onAuthStateChanged(auth, callback);
