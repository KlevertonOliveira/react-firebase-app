import React, { useContext, useEffect, useState } from 'react';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';

const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {

    const auth = getAuth();

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    
    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signUp,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}