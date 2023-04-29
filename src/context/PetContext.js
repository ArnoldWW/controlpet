import { db, doc, setDoc } from "../firebase";
import { createContext } from "react";

const PetContext = createContext(null);

const PetProvider = ({ children }) => {
  const createPet = async (pet) => {
    await setDoc(doc(db, "pets", pet.name), pet);
  };

  return (
    <PetContext.Provider
      value={{
        createPet
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export { PetProvider };
export default PetContext;
