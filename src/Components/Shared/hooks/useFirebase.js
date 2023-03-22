import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import initializeAppAuthentication from "../Firebase/firebase.init";


initializeAppAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [loginLoad, setLoginLoad] = useState(false);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const saveUser = (user, method) => {
        fetch('https://my-messanger-server-production.up.railway.app/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())

    }

    const googleSignIn = (location, navigate) => {
        setLoginLoad(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                saveUser(user, "PUT");
                setUser(user);
                navigate(location.state?.from.pathname || '/');
            })
            .catch(error => {
            }).finally(setLoginLoad(false))
    };

    const signUpWithEmail = (info) => {
        const { name, email, password, location, navigate } = info;
        setLoginLoad(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setAuthError('');
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
                    // saveUser(user, "POST"); 
                    saveUser(user, "POST");


                }).catch((error) => {
                    // An error occurred
                    // ...
                    const errorMessage = error.message;
                    setAuthError(errorMessage);
                })

                navigate(location.state?.from.pathname || '/')
                // ...
            }).catch(error => {
                const errorMessage = error.message;
                setAuthError(errorMessage);
            }).finally(setLoginLoad(false))
    };
    const userImgUpdate = (photoURL) => {
        updateProfile(auth.currentUser, {
            photoURL
        }).then((data) => {
            saveUser(user, "PUT");
        }).catch((error) => {
            // An error occurred 
        }
        )
    }
    const logInWithEmail = info => {
        const { email, password } = info;
        setLoginLoad(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                setAuthError('');
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage);
            }).finally(setLoginLoad(false))
    }
    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            setLoading(false);
        });
    }, [auth]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser({});
            // Sign-out successful.
        }).catch((error) => {
            // An error happened. 
        });
    }

    return {
        user,
        handleSignOut,
        googleSignIn,
        signUpWithEmail,
        logInWithEmail,
        loading,
        userImgUpdate,
        authError,
        loginLoad,
    };
};

export default useFirebase;