import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";

const confirmAccount = () => {
  const { loadingUserData, checkAuthStatus, logOut } = useContext(AuthContext);

  useEffect(() => {
    checkAuthStatus(false, true);
  }, []);

  if (loadingUserData === 0) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="min-h-screen min-w-full flex justify-center flex-col items-center">
      <h1>Confirm Account</h1>

      <button className="btn" onClick={() => logOut()}>
        Cerrar sesion
      </button>
    </div>
  );
};

export default confirmAccount;
