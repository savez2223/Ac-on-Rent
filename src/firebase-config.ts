// firebase-config.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration object (copy this from your Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAlTYRN8EKu3hdt29vg3YUpTnVh_WjtiP0",
  authDomain: "ac-on-rent-c6a29.firebaseapp.com",
  databaseURL: "https://ac-on-rent-c6a29-default-rtdb.firebaseio.com", // Ensure this URL matches
  projectId: "ac-on-rent-c6a29",
  storageBucket: "ac-on-rent-c6a29.appspot.com",
  messagingSenderId: "653085674959",
  appId: "1:653085674959:web:233c3476099fad0e6856ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const db = getDatabase(app);

export { db };
