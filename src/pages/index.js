import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { number, setNumber } = useContext(AuthContext);

  return (
    <Layout>
      <h1>Home</h1>
      <p>{number}</p>
      <button onClick={() => setNumber((n) => n + 1)}>+</button>
    </Layout>
  );
}
