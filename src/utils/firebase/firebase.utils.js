import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNai0ddLX0pdmb1wWhB_13NI2EX0BQ6xM",
    authDomain: "crwn-db2-1348d.firebaseapp.com",
    projectId: "crwn-db2-1348d",
    storageBucket: "crwn-db2-1348d.firebasestorage.app",
    messagingSenderId: "128385472741",
    appId: "1:128385472741:web:c602d530dd0e8c0b6d9c0c"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInfomation= {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef); //get document DATA
    console.log(userSnapshot);
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); 

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...additionalInfomation,
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef; //if userSnapshot DOES exist
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password ) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password ) return;

    return await signInWithEmailAndPassword(auth, email, password);
}