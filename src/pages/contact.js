import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";

const Contact = () => {
  const { loadingUserData, checkAuthStatus } = useContext(AuthContext);

  useEffect(() => {
    checkAuthStatus(false, true);
  }, []);

  if (loadingUserData === 0) {
    return <h1>loading...</h1>;
  }

  return <Layout>contact</Layout>;
};

export default Contact;
