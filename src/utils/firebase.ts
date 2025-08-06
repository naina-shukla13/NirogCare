import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
 
  apiKey: "AIzaSyADIztoMONq61iGP-5DVONiyET6CIKCTRQ",
  authDomain: "nirogcare-c268e.firebaseapp.com",
  projectId: "nirogcare-c268e",
  storageBucket: "nirogcare-c268e.firebasestorage.app",
  messagingSenderId: "873269251525",
  appId: "1:873269251525:web:c8d0656836905cb7100fac",
  measurementId: "G-WHMM37380J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase Auth instance
export const auth = getAuth(app);
