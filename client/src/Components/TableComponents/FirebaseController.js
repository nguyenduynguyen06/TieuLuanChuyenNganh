import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCSEykhR8QCNNHnGPWf_Kw1QzBaPWu4rfY",
  authDomain: "otppp-4a088.firebaseapp.com",
  projectId: "otppp-4a088",
  storageBucket: "otppp-4a088.appspot.com",
  messagingSenderId: "1048579207633",
  appId: "1:1048579207633:web:b2caef1d5ee6a183a830f0",
  measurementId: "G-RS2L8MFGSC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);