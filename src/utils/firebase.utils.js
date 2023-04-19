// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { 
  getFirestore, 
  getDoc,
  setDoc,
  doc,
  Timestamp 
} from 'firebase/firestore'
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

const GoogleProvider = new GoogleAuthProvider()
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return user
  } catch(error) {
    const { code, message } = error
    if(code === 'auth/email-already-in-use') {
      return {error: 'Unable to create user. Email already in use.'}
    }
    return {error: `${code}: ${message}`}
  }
}

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return user
  } catch(error) {
    const { code, message } = error
      return {error: `${code}: ${message}`}
  }
}

export const signInUserWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, GoogleProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    return user
  } catch(error) {
    const { code, message } = error
      return {error: `${code}: ${message}`}
  }
  
}

export const signOutUser = async () => {
  try {
    await signOut(auth)
    return true
  } catch(error) {
    return false
  }
}

//Firestore CRUD functions
export const createUserFromAuth = async (user, additionalInfo = {firstName: '', lastName: ''}) => {
  if(!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userDocRef)
  if(!userSnapshot.exists()) {
    const {displayName, email} = user
    const creationDate = Timestamp.fromDate(new Date())
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        creationDate,
        ...additionalInfo
      })
    } catch (error) {
      const { code, message } = error
      return {error: `${code}: ${message}`}
    }
  }
  return userDocRef
}

const convertTimestamp = (timestamp) => {
	let date = timestamp.toDate()
  let dd = date.getDate()
	let mm = date.getMonth()
	let yyyy = date.getFullYear()

	return `${dd}/${mm}/${yyyy}`
}

export const getUserInfo = async (user) => {
  if(!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userDocRef)
  const userData = userSnapshot.data()
  const { creationDate } = userData
  if(userData.creationDate !== null) {
    userData.creationDate = convertTimestamp(userData.creationDate)
  } 
  return userData
}

export const updateUserInfo = async (user, userData = {}) => {
  if(!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userDocRef)
  if(!userSnapshot.exists()) return
  const fetchedUserData = userSnapshot.data()
  const newUserData = {...fetchedUserData, ...userData}
  try {
    //update user data on Firestore
     await setDoc(userDocRef, newUserData)
  } catch(error) {
    const { code, message } = error
    return {error: `${code}: ${message}`}
  }
  return newUserData
}

//NOT FINISHED YET
export const addNewUserTransaction = async (user, transactionObject) => {
  if(!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userDocRef)
  if(!userSnapshot.exists()) return
  const fetchedUserData = userSnapshot.data()
}