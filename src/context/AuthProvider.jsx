import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AUTH_CONTEXT = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // create user with email password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // user name update
  const updateName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  // user name update
  const logOut = () => {
    return signOut(auth);
  };
  // track user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("User observer", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // user full data

  const authInfo = {
    createUser,
    loginUser,
    updateName,
    user,
    logOut
  };
  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
