import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB88Gyq5j3K2nSZkiKBn-zKcYGVFTtPCbo",
  authDomain: "mediqueue-5f070.firebaseapp.com",
  projectId: "mediqueue-5f070",
  storageBucket: "mediqueue-5f070.firebasestorage.app",
  messagingSenderId: "161040528760",
  appId: "1:161040528760:web:ce16a68267bdece182048d",
  measurementId: "G-1N78R8LS6X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);