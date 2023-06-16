import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvder = ({ children }) => {
  const [user, setUser] = useState({});
  const [dbUser, setDbUser] = useState(null);
  const provider = new GoogleAuthProvider();

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
            console.log("DB USER:", dbUser);
          } else setDbUser(null);
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

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        signOutUser,
        signInUser,
        dbUser,
        signInWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
