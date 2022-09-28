// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-IpPeyNEBAJeZlLRDNVDaKJavy3_clYY",
  authDomain: "realtor-clone-react-2d479.firebaseapp.com",
  projectId: "realtor-clone-react-2d479",
  storageBucket: "realtor-clone-react-2d479.appspot.com",
  messagingSenderId: "1005665137273",
  appId: "1:1005665137273:web:3d7b2d991fa4b948819aa8"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore()