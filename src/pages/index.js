import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const { loadingUserData, currentUser, checkAuthStatus } =
    useContext(AuthContext);

  useEffect(() => {
    checkAuthStatus(false, true);
  }, []);

  if (loadingUserData === 0) {
    return <h1>loading...</h1>;
  }

  return (
    <Layout>
      <h1 className="heading1 text-center">Mis Mascotas</h1>
    </Layout>
  );
}
