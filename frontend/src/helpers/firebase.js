import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: getEnv("VITE_AUTH_DOMAIN"),
  projectId: getEnv("VITE_PROJECT_ID"),
  storageBucket: getEnv("VITE_STORAGE_BUCKET"),
  messagingSenderId: getEnv("VITE_MESSAGING_SENDER_ID"),
  appId: getEnv("VITE_APP_ID"),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
