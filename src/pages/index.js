import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PetContext from "@/context/PetContext";
import AuthContext from "@/context/AuthContext";
import Layout from "@/components/Layout";
import PetList from "@/components/PetList";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const { loadingPets, pets, getPets } = useContext(PetContext);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter === "") {
      getPets();
    } else {
      getPets(filter);
    }
  }, [currentUser, loadingPets, filter]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  if (loadingPets) {
    return (
      <Layout>
        <p>loading...</p>
      </Layout>
    );
  }

  if (!loadingPets && pets.lenght === 0) {
    return (
      <Layout>
        <p>No hay mascotas</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        <h1 className="heading1 text-center">Mis mascotas</h1>
        <section className="flex justify-between items-center my-8">
          <select
            className="py-2 p-2 border min-w-[200px] border-black bg-white"
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="saludable">Saludable</option>
            <option value="recuperacion">Recuperacion</option>
            <option value="enfermo">Enfermo</option>
          </select>

          <Link href="/create-pet" className="btn">
            Crear mascota
          </Link>
        </section>
        <section className="my-5">
          <ul>
            <PetList pets={pets} />
          </ul>
        </section>
      </>
    </Layout>
  );
}
