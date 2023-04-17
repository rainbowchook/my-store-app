// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence, 
  browserSessionPersistence 
} from 'firebase/auth'
import { 
  getFirestore, 
  addDoc, 
  getDoc,
  setDoc,
  getDocs, 
  doc,
  collection,
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
  } catch(error) {
    const { code, message } = error
      return {error: `${code}: ${message}`}
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
    // await addDoc(collection(db, 'users'), {
    //   uid: user.uid,
    //   firstName,
    //   lastName,
    //   displayName: user.displayName,
    //   email: user.email,
    //   creationTime: user.metadata.creationTime
    // })
    console.log(user)
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
    console.log(user)
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
    console.log('token', token)
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
	let date = timestamp.toDate();
	let mm = date.getMonth();
	let dd = date.getDate();
	let yyyy = date.getFullYear();

	date = mm + '/' + dd + '/' + yyyy;
	return date;
}

export const getUserInfo = async (user) => {
  if(!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userDocRef)
  console.log('getUserInfo userSnapshot', userSnapshot)
  const userData = userSnapshot.data()
  const { creationDate } = userData
  console.log(userData.creationDate !== null)
  console.log(typeof userData.creationDate === Timestamp)
  console.log(creationDate.toDate()) 
  if(userData.creationDate !== null) {
    // userData.creationDate = userData.creationDate.toDate().toString()
    userData.creationDate = convertTimestamp(userData.creationDate)
  } 
  console.log(userData)
  return userData
  // try {
    
    //fetch user data from Firestore
    //construct return data object from retrieved user data
    // const userProfile = {
    //   firstName,
    //   lastName,
    //   phone,
    //   addressLine1,
    //   addressLine2,
    //   cityTownVillage,
    //   stateProvinceRegion,
    //   postCode,
    //   country,
    // }
  // } catch(error) {
  //   const { code, message } = error
  //     return {error: `${code}: ${message}`}
  // }
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