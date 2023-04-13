import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
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
  const createUser = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      setLoadingUserData(1);
      await updateUserProfile(name);
      await sendEmailForVerifyAccount();
      toast.success("Cuenta creada!");
      //router.push("/confirmAccount");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendEmailForVerifyAccount = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Correo de verificacion enviado!");
    } catch (error) {
      toast.error(error);
    }
  };

  const updateUserProfile = async (name = "") => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name
      });
      toast.success("Update user!");
    } catch (error) {
      toast.error(error);
    }
  };

  const logOut = async () => {
    const res = confirm("¿Deseas cerrar la sesion?");
    if (!res) return;

    try {
      await signOut(auth);
      setCurrentUser({});
      setLoadingUserData(2);
      router.push("/login");
    } catch (error) {
      // An error happened.
      console.error(error);
    }
  };

  const checkAuthStatus = (
    redirectWithUser = false,
    redirectWithOutUser = false
  ) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setCurrentUser(user);
          setLoadingUserData(1);

          if (!user.emailVerified) {
            console.log("verifcacion:", user.emailVerified);
            return router.push("/confirmAccount");
          }

          if (redirectWithUser) {
            return router.push("/");
          }
        } else {
          // User is signed out
          console.log("no user");
          setCurrentUser({});
          setLoadingUserData(2);

          if (redirectWithOutUser) {
            return router.push("/login");
          }
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
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
