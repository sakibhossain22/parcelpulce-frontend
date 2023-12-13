/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
export const AuthContext = createContext(null)
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosSecure from "../Hooks/AxiosSecure/useAxiosSecure";

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const gooeleProvider = new GoogleAuthProvider();
    const signUpEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const emailLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, gooeleProvider)
    }

    const updateUser = async (name, photo) => {
        setLoading(true)
        await updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
        setLoading(false)
    }
    const logOut = () => {
        return signOut(auth)

    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            const userInfo = {email : user?.email}
            if(user){
                axiosSecure.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setUser(user)
                    }
                })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
            console.log(user)
        })
        return () => unSubscribe()
    }, [axiosSecure])
    const data = {
        emailLogin,
        signUpEmail,
        googleLogin,
        updateUser,
        loading,
        user,
        logOut
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;