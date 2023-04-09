import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "../firebase";
import { toast } from "react-hot-toast";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  //states--
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});
  /* 0 - loading | 1 - user signin | 2 - user signout */
  const [loadingUserData, setLoadingUserData] = useState(0);

  //effects--
  useEffect(() => {
    console.log("change auth status...");
  }, [loadingUserData]);

  //functions--
  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      setLoadingUserData(1);
      router.push("/");
      toast.success("Cuenta creada!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("log out...");
        setCurrentUser({});
        setLoadingUserData(2);
        toast.error("log out!");
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  const checkAuthStatus = (
    redirectWithUser = false,
    redirectWithOutUser = false
  ) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          console.log(user);
          setCurrentUser(user);
          setLoadingUserData(1);

          if (redirectWithUser) {
            router.push("/");
          }
        } else {
          // User is signed out
          console.log("no user");
          setCurrentUser({});
          setLoadingUserData(2);

          if (redirectWithOutUser) {
            router.push("/login");
          }
        }
      });
    } catch (error) {
      console.error(error);
      setCurrentUser({});
      setLoadingUserData(2);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential);
      setLoadingUserData(1);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loadingUserData,
        currentUser,
        createUser,
        logOut,
        checkAuthStatus,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
