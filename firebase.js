// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD6qaN6P2Lv4oDSm4Ytml4npz5MiyRAY1s',
	authDomain: 'citizenwatch-a1d4f.firebaseapp.com',
	projectId: 'citizenwatch-a1d4f',
	storageBucket: 'citizenwatch-a1d4f.appspot.com',
	messagingSenderId: '916056089924',
	appId: '1:916056089924:web:c507ef2109fbde823a2311',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app)

export { app, firestore, storage };
