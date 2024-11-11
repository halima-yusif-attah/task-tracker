import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYDuJOymZUHDwVf4lvKUIp2ck6vnJTrOc",
  authDomain: "task-tracker-app-8e3f8.firebaseapp.com",
  projectId: "task-tracker-app-8e3f8",
  storageBucket: "task-tracker-app-8e3f8.firebasestorage.app",
  messagingSenderId: "82458313955",
  appId: "1:82458313955:web:0b0476e0ab4aa1dc29f1d6"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db };