// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtjOweiz_0dRsSw8QgRf-bD9SjZYY0MY8",
  authDomain: "ppeproject-1.firebaseapp.com",
  projectId: "ppeproject-1",
  storageBucket: "ppeproject-1.appspot.com",
  messagingSenderId: "956764737183",
  appId: "1:956764737183:web:19b9ad9f7b2ed52e5e5caa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app