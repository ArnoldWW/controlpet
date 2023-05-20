import Layout from "@/components/Layout";
import PetContext from "@/context/PetContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Pet = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getPet, deletePet } = useContext(PetContext);

  const [pet, setPet] = useState({});
  /* 0 loading, 1 load, 2 not found */
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const fetchPet = async () => {
      if (id) {
        const petData = await getPet(id);
        if (!petData) {
          setLoading(2);
          router.push("/");
          return;
        }

        setPet(petData);
        setLoading(1);
      }
    };

    fetchPet();
  }, [id, loading]);

  return (
    <Layout>
      {loading === 0 ? (
        <p>loading...</p>
      ) : (
        <>
          <section>
            <div className="flex justify-center">
              <h1 className="heading1">Mi Mascota - {pet?.name}</h1>
            </div>
            <Image
              src={pet.photo}
              alt={`foto de ${pet.name}`}
              width={200}
              height={200}
              className="object-cover w-64 h-64 mx-auto my-5"
            />
          </section>

          <section>
            <h2 className="heading2">Detalles de la mascota</h2>

            <ul className="list-disc">
              <li className="font-bold my-3">
                Nombre: <span className="font-normal">{pet.name}</span>
              </li>
              <li className="font-bold my-3">
                Edad: <span className="font-normal">{pet.age} años</span>
              </li>
              <li className="font-bold my-3">
                Peso: <span className="font-normal">{pet.weight} KG</span>
              </li>

              <li className="font-bold my-3">
                Color: <span className="font-normal">{pet.color}</span>
              </li>

              <li className="font-bold my-3">
                Estado: <span className="font-normal">{pet.status}</span>
              </li>

              <li className="font-bold my-3">
                Tipo: <span className="font-normal">{pet.type}</span>
              </li>

              <li className="font-bold my-3">
                Tipo de alimentacion:
                <span className="font-normal">{pet.feeding}</span>
              </li>

              <li className="font-bold my-3">
                Detalles de salud y alimentacion:{" "}
                <span className="font-normal">{pet.feedingDetails}</span>
              </li>
            </ul>
          </section>

          <section className="flex items-center my-5">
            <button className="btn" onClick={() => deletePet(pet)}>
              Eliminar
            </button>
            <Link href={`/edit-pet/${id}`} className="btn block">
              Editar
            </Link>
          </section>
        </>
      )}
    </Layout>
  );
};

export default Pet;
