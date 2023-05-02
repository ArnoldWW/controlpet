import Layout from "@/components/Layout";
import PetForm from "@/components/PetForm";

const CreatePet = () => {
  return (
    <Layout>
      <h1 className="heading1 text-center">Crea una nueva mascota</h1>

      <PetForm />
    </Layout>
  );
};

export default CreatePet;
