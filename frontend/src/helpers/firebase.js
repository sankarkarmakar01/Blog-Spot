import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "mern-blog-application-eb7f4.firebaseapp.com",
  projectId: "mern-blog-application-eb7f4",
  storageBucket: "mern-blog-application-eb7f4.firebasestorage.app",
  messagingSenderId: "691015866369",
  appId: "1:691015866369:web:15e75a22367e2d974c4800",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
