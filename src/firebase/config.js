import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "todos-app-cc04f.firebaseapp.com",
  projectId: "todos-app-cc04f",
  storageBucket: "todos-app-cc04f.appspot.com",
  messagingSenderId: "990519548237",
  appId: "1:990519548237:web:1d77a9c29a875eccd77f04",
  measurementId: "G-NKD33Y44ZH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };