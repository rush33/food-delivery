import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBJcwDzUMNJLKzAEyvRwACMYOrUS1u3oR0",
  authDomain: "food-delivery-e0cba.firebaseapp.com",
  projectId: "food-delivery-e0cba",
  storageBucket: "food-delivery-e0cba.appspot.com",
  messagingSenderId: "595569381333",
  appId: "1:595569381333:web:6872be5d474cf64473775c",
};

export const app = initializeApp(firebaseConfig);

//init database
export const db = getFirestore(app);
