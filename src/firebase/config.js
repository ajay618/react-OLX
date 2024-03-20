import firebaseApp from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYicqhhwXU2SSTV4Q8H4rRt_tUDO7YWaA",
    authDomain: "olx-clone-3b7bb.firebaseapp.com",
    projectId: "olx-clone-3b7bb",
    storageBucket: "olx-clone-3b7bb.appspot.com",
    messagingSenderId: "642937616621",
    appId: "1:642937616621:web:6eefaf1dd5181f8d89b4e4",
    measurementId: "G-CC32BWTMHD"
  };

export default firebaseApp.initializeApp(firebaseConfig);
