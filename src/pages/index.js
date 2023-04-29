import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

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
      <section>
        <select>
          <option>-</option>
          <option>1</option>
          <option>2</option>
        </select>

        <Link href="/create-pet" className="btn">
          Crear mascota
        </Link>
      </section>
      <section className="my-5">
        <ul>
          <li>Mascota 1</li>

          <li>Mascota 2</li>
        </ul>
      </section>
    </Layout>
  );
}
