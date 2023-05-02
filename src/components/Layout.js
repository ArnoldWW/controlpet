import { useContext, useEffect } from "react";
import Header from "./Header";
import AuthContext from "@/context/AuthContext";

const Layout = ({ children }) => {
  const { loadingUserData, currentUser, checkAuthStatus } =
    useContext(AuthContext);

  useEffect(() => {
    checkAuthStatus(false, true);
  }, []);

  if (loadingUserData === 0) {
    return (
      <>
        <Header />
        <main className="container my-10">
          <h1 className="heading1">Cargando usuario...</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container my-10">{children}</main>
      <footer className="container border-t text-center p-5">
        Todos los derechos reservados &copy; controlpet.
      </footer>
    </>
  );
};

export default Layout;
