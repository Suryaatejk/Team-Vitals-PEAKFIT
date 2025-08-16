// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDrbiKUz1g1GXfvsC1TYdWc1ewE6FWIe3o",
    authDomain: "peak-fit-e9512.firebaseapp.com",
    projectId: "peak-fit-e9512",
    storageBucket: "peak-fit-e9512.firebasestorage.app",
    messagingSenderId: "245588410325",
    appId: "1:245588410325:web:96f84650ee1a4461fe875c",
    measurementId: "G-5V6MBFE49E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Function to get user data from Firestore
const getUserData = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Function to save user data to Firestore
const saveUserData = async (uid, email, name) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email: email,
      name: name,
      createdAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

// Sign Up Function (Email & Password)
const signUpWithEmail = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data with additional name field
    await saveUserData(user.uid, email, name);

    console.log("Email sign-up successful:", user.email);
    return user;
  } catch (error) {
    console.error("Sign Up Error:", error.message);
    throw error;
  }
};

// Login Function (Email & Password)
const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email sign-in successful:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

// Google Sign In function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Store Google user data if they don't exist
    const userData = await getUserData(user.uid);
    if (!userData) {
      await saveUserData(user.uid, user.email, user.displayName);
    }

    console.log("Google sign-in successful:", user.email);
    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  }
};

export { 
  auth, 
  db,
  googleProvider, 
  signInWithGoogle, 
  signUpWithEmail,
  loginWithEmail,
  logout,
  getUserData,
  saveUserData
};
