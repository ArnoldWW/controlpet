import Layout from "@/components/Layout";
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
      <h1>Home</h1>
      <button onClick={() => toast.success("click")}>click</button>
    </Layout>
  );
}
