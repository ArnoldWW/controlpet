import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PetContext from "@/context/PetContext";
import Layout from "@/components/Layout";
import PetForm from "@/components/PetForm";
import Image from "next/image";

const EditPet = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getPet } = useContext(PetContext);

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
          <h1 className="heading1 text-center">
            Edita los datos de {pet.name}
          </h1>
          <PetForm petToUpdate={pet} />
        </>
      )}
    </Layout>
  );
};

export default EditPet;
