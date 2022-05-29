import { initializeApp } from 'firebase/app'
import { collection, getFirestore, getDocs, snapshotEqual } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaTAyd2p0-YwmXk62ik2vxcvPmEPJZtLc",
    authDomain: "astroseeker-c0606.firebaseapp.com",
    databaseURL: "https://astroseeker-c0606-default-rtdb.firebaseio.com",
    projectId: "astroseeker-c0606",
    storageBucket: "astroseeker-c0606.appspot.com",
    messagingSenderId: "357931216130",
    appId: "1:357931216130:web:e6c69ab9ee9dd6b9c4a61b",
    measurementId: "G-WV8T8QJ8VJ"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export default db;
// MARK: Firestore Reference