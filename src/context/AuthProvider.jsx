import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  deleteUser,
} from "firebase/auth";

export const AUTH_CONTEXT = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userFullInfo, setUserFullInfo] = useState({});

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
  // user forget password
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // user forget password
  const userUpdatePassword = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  };
  // user forget password
  const deleteUserAccount = () => {
    return deleteUser(auth.currentUser);
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

  useEffect(() => {
    fetch(`https://anaf-server.vercel.app/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserFullInfo(data);
        setLoading(false);
      });
  }, [user]);
  const authInfo = {
    createUser,
    loginUser,
    updateName,
    forgetPassword,
    userUpdatePassword,
    userFullInfo,
    user,
    deleteUserAccount,
    loading,
    setLoading,
    logOut,
  };
  return (
    <AUTH_CONTEXT.Provider value={authInfo}>{children}</AUTH_CONTEXT.Provider>
  );
};

export default AuthProvider;
