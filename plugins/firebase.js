// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// create your firebase project on firebase.google.com, copy the configurations. then create a .env file from the root dir, paste the configurations (replace colon (:) with equal sign (=))
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
}

// Initialize Firebase
initializeApp(firebaseConfig)

connectAuthEmulator(getAuth(), 'http://localhost:9099')
connectFirestoreEmulator(getFirestore(), 'localhost', 8080)
connectStorageEmulator(getStorage(), 'localhost', 9199)
