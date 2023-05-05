import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBJcwDzUMNJLKzAEyvRwACMYOrUS1u3oR0",
  authDomain: "food-delivery-e0cba.firebaseapp.com",
  projectId: "food-delivery-e0cba",
  storageBucket: "food-delivery-e0cba.appspot.com",
  messagingSenderId: "595569381333",
  appId: "1:595569381333:web:6872be5d474cf64473775c",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
