import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD3d9_d-FkimjdxUmriYDIx3USKuT7unHc",
    authDomain: "ovechkin-app.firebaseapp.com",
    projectId: "ovechkin-app",
    storageBucket: "ovechkin-app.firebasestorage.app",
    messagingSenderId: "768501301315",
    appId: "1:768501301315:web:cd2b4e52a43c000c4ed4f6"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
