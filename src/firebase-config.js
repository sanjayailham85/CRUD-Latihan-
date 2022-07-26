import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from 'firebase/storage'


const firebaseConfig = {

  apiKey: "AIzaSyCH-R5LSG0hOwU79yuc1IGHN40nt0PhnOA",

  authDomain: "magang-crud.firebaseapp.com",

  projectId: "magang-crud",

  storageBucket: "magang-crud.appspot.com",

  messagingSenderId: "358652994801",

  appId: "1:358652994801:web:4e9567502ee3f965793550",

  measurementId: "G-ZEKHR92XN0"

};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

export const db = getFirestore(app)