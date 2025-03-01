// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth, connectAuthEmulator } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZQnFsZORYY4BLH6l6KDdsMV5N8cksu-I",
  authDomain: "peer-prep-auth.firebaseapp.com",
  projectId: "peer-prep-auth",
  storageBucket: "peer-prep-auth.firebasestorage.app",
  messagingSenderId: "427617098375",
  appId: "1:427617098375:web:c3d051ae3402b180053622"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getAuth();
connectAuthEmulator(database , 'http://localhost:9099');
export default database;
