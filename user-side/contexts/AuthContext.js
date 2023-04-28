import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvder = ({ children }) => {
  const [user, setUser] = useState({});
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      const uid = currentUser?.uid;
      if (uid) {
        const getUserData = async () => {
          const userRef = doc(db, "user", uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setDbUser(docSnap.data());
            console.log("DB USER:", dbUser)
          } else 
            setDbUser(null)
        };
        getUserData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    signOut(auth);
  };

  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <UserContext.Provider value={{ createUser, user, signOutUser, signInUser, dbUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
