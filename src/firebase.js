// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYtwK6Tx27NM83XppTX4wYOVs6K4dt9WM",
  authDomain: "todo-crud-e305e.firebaseapp.com",
  databaseURL: "https://todo-crud-e305e-default-rtdb.firebaseio.com",
  projectId: "todo-crud-e305e",
  storageBucket: "todo-crud-e305e.appspot.com",
  messagingSenderId: "493684762753",
  appId: "1:493684762753:web:05006eb8e32d6e70da4580",
  measurementId: "G-HP20DVENVY",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
