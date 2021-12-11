import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import initializeAppAuthentication from "../Firebase/firebase.init";


initializeAppAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [updateCart, setUpdateCart] = useState(0);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const saveUser = (user, method) => {
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => console.log(res))

    }

    const googleSignIn = (location, navigate) => {
        console.log('hi');
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                saveUser(user, "PUT");
                setUser(user);
                navigate(location.state?.from.pathname || '/');
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    const signUpWithEmail = (info) => {
        const { name, email, password, location, navigate } = info;
        console.log('info', info);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //save user ot database
                //update user profile
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://i.stack.imgur.com/YaL3s.jpg"
                }).then((data) => {
                    // Profile updated!
                    // setUser(user);
                    // ...
                    // await handleSignOut();
                    // await logInWithEmail({ email, password });
                    // console.log(user);
                    // saveUser(user, "POST");
                    console.log('update success', user);
                    saveUser(user, "POST");


                }).catch((error) => {
                    // An error occurred
                    // ...
                })

                navigate(location.state?.from.pathname || '/')
                // ...
            }).catch(error => {
                console.log(error.message);
            })
    };
    const logInWithEmail = info => {
        const { email, password } = info;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            setLoading(false);
        });
    }, [auth, updateCart]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser({});
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return {
        user,
        handleSignOut,
        googleSignIn,
        signUpWithEmail,
        logInWithEmail,
        updateCart,
        setUpdateCart,
        loading
    };
};

export default useFirebase;