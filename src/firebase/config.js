import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBIBnxZZ6dpbL5-N4C-kumoN2xyk1-DPUw",
  authDomain: "mall-management-system-a294e.firebaseapp.com",
  projectId: "mall-management-system-a294e",
  storageBucket: "mall-management-system-a294e.appspot.com",
  messagingSenderId: "22881729201",
  appId: "1:22881729201:web:c195eb9bbb25b09ceec090",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };
