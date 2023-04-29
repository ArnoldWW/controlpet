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
    return <h1>loading...</h1>;
  }

  return (
    <>
      <Header />
      <main className="container my-10 p-5">{children}</main>
      <footer className="container border-t text-center p-5">
        Todos los derechos reservados &copy; controlpet.
      </footer>
    </>
  );
};

export default Layout;
