import { useRouter } from "next/router";
import {
  auth,
  db,
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  getDoc,
  where,
  deleteDoc,
  updateDoc
} from "../firebase";
import {
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject
} from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { toast } from "react-hot-toast";

const PetContext = createContext(null);

const PetProvider = ({ children }) => {
  const router = useRouter();
  const { currentUser, loadingUserData } = useContext(AuthContext);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);

  useEffect(() => {
    if (loadingUserData === 2) {
      setPets([]);
    }
  }, [loadingUserData]);

  //upload image when create a pet
  const uploadPetImage = async (fileImage) => {
    const userID = auth.currentUser.uid;
    const petID = String(Math.floor(Math.random() * 100000) + 1 + Date.now());

    const storageRef = ref(storage, `/${userID}/pet-${petID}`);

    try {
      const snapshot = await uploadBytes(storageRef, fileImage);
      const URL = await getDownloadURL(snapshot.ref);
      return { URL, petID };
    } catch (error) {
      setIsCreating(false);
      console.error(error);
    }
  };

  //create a pet
  const createPet = async (pet, fileImage) => {
    //get url image pet
    setIsSubmittingForm(true);
    const { URL, petID } = await uploadPetImage(fileImage);
    //create object with full data, include image
    const updatedPetData = {
      ...pet,
      id: petID,
      photo: URL,
      owner: currentUser.uid
    };

    try {
      console.log(updatedPetData);

      //insert data
      await setDoc(doc(db, "pets", updatedPetData.id), updatedPetData);

      //update state
      const updatedPetList = [...pets, updatedPetData];
      setPets(updatedPetList);
      setIsSubmittingForm(false);
      toast.success("Mascota creada");
      router.push("/");
    } catch (error) {
      setIsSubmittingForm(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  //get a pet
  const getPets = async (filter = "") => {
    try {
      if (currentUser.uid) {
        console.log("obtener mascotas");
        let q;

        if (filter === "") {
          q = query(
            collection(db, "pets"),
            where("owner", "==", currentUser.uid)
          );
        } else {
          q = query(
            collection(db, "pets"),
            where("owner", "==", currentUser.uid),
            where("status", "==", filter)
          );
        }

        const querySnapshot = await getDocs(q);
        const petsList = [];

        querySnapshot.forEach((doc) => {
          petsList.push(doc.data());
        });

        setLoadingPets(false);
        console.log(petsList);
        setPets(petsList);
      }
    } catch (error) {
      console.log(error);
      setLoadingPets(false);
    }
  };

  //get a pet
  const getPet = async (id) => {
    try {
      const docRef = doc(db, "pets", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const pet = docSnap.data();
        console.log("Get pet:", pet);

        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No encontrado!");
        return null;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  //delete pet
  const deletePet = async (petToRemove) => {
    const response = confirm(
      "Estas seguro de que quieres eliminar esta mascota?"
    );
    const imageRef = ref(storage, petToRemove.photo);

    if (response) {
      try {
        await deleteObject(imageRef);
        await deleteDoc(doc(db, "pets", petToRemove.id));

        //update state
        const updatedPetList = pets.filter((pet) => pet.id !== petToRemove.id);
        setPets(updatedPetList);
        toast.success("Mascota eliminada");
        router.push("/");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  //update pet
  const updatePet = async (updatedPet) => {
    const petRef = doc(db, "pets", updatedPet.id);
    try {
      setIsSubmittingForm(true);
      await updateDoc(petRef, updatedPet);
      toast.success("Mascota actualizada");
      setIsSubmittingForm(false);
      router.push(`/pet/${updatedPet.id}`);
    } catch (error) {
      setIsSubmittingForm(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <PetContext.Provider
      value={{
        isSubmittingForm,
        pets,
        loadingPets,
        createPet,
        uploadPetImage,
        getPets,
        getPet,
        deletePet,
        updatePet
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export { PetProvider };
export default PetContext;
