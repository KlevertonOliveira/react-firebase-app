import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export const registerUser = async(email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
    
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    })
}

export const signIn = async(email, password) =>{
    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export const signOut = async() => {
    const auth = getAuth();

    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}