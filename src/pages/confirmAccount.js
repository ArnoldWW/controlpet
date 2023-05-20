import Logo from "@/components/Logo";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const confirmAccount = () => {
  const { currentUser, loadingUserData, checkAuthStatus, logOut } =
    useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus(false, true);
    if (currentUser.emailVerified) {
      return router.push("/");
    }
  }, []);

  if (loadingUserData === 0) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="min-h-screen max-w-[600px] mx-auto flex justify-center flex-col items-center">
      <Logo />

      <h1 className="my-5 text-center">
        Tu cuenta ha sido creada, debes confirmar tu cuenta, revisa tu correo{" "}
        <span className="text-blue-900 font-bold">{currentUser.email}</span>{" "}
        para confirmar tu cuenta.
      </h1>
      <button className="btn" onClick={() => logOut()}>
        Cerrar sesion
      </button>
    </div>
  );
};

export default confirmAccount;
