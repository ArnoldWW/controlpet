import { auth, onAuthStateChanged } from "../firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useUser = (UrlToRedirect = "/login") => {
  /* 
    1-loading
    2-user is signed
    3-user is signed out
  */
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [authStatus, setAuthStatus] = useState(1);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setUserData(user);
        setAuthStatus(2);
        router.push("/");
        // ...
      } else {
        // User is signed out
        // ...
        router.push(UrlToRedirect);
        setAuthStatus(3);
      }
    });
  }, [authStatus]);

  return [userData, authStatus];
};

export default useUser;
