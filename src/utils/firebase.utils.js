// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  setPersistence, 
  browserSessionPersistence 
} from 'firebase/auth'
import { getFirestore, addDoc, getDocs, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

// const GoogleAuthProvider =
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log(auth)

export const setUserSession = async (email, password) => {
  try {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    await setPersistence(auth, browserSessionPersistence)
    return signInUser(email, password)
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  }
  // setPersistence(auth, browserSessionPersistence)
  //   .then(() => {
  //     // Existing and future Auth states are now persisted in the current
  //     // session only. Closing the window would clear any existing state even
  //     // if a user forgets to sign out.
  //     // ...
  //     // New sign-in will be persisted with session persistence.
  //     return signInWithEmailAndPassword(email, password);
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
      
  //   });
}

//set auth state persistence to session for sign up too
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)
    const user = userCredential.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    })
    console.log(user)
    return user
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  }
}

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log(user)
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  }
}

// export const signInUserWithGoogle = async (email, password) => {
//   const userCredential = await signInWithPopup(auth, GoogleProvider);
//   // The signed-in user info.
//   const user = userCredential.user;
//   // This gives you a Google Access Token.
//   const credential = GoogleProvider.credentialFromResult(auth, result);
//   const token = credential.accessToken;
// }

export const signOutUser = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    return false
  }
}