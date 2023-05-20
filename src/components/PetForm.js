import { useContext, useEffect, useState } from "react";
import PetContext from "@/context/PetContext";
import { useRouter } from "next/router";

const COLORS = [
  {
    id: 1,
    option: "negro"
  },
  {
    id: 2,
    option: "blanco"
  },
  {
    id: 3,
    option: "rojo"
  },
  {
    id: 4,
    option: "azul"
  },
  {
    id: 5,
    option: "amarillo"
  },
  {
    id: 6,
    option: "verde"
  },
  {
    id: 7,
    option: "naranja"
  },
  {
    id: 8,
    option: "morado o violeta"
  },
  {
    id: 9,
    option: "rosa"
  },
  {
    id: 10,
    option: "gris"
  },
  {
    id: 11,
    option: "cafe"
  },
  {
    id: 12,
    option: "otro"
  }
];
const PETTYPE = [
  {
    id: 1,
    option: "perro"
  },
  {
    id: 2,
    option: "gato"
  },
  {
    id: 3,
    option: "conejo"
  },
  {
    id: 4,
    option: "Ave"
  },
  {
    id: 5,
    option: "pez"
  },
  {
    id: 6,
    option: "otro"
  }
];
const FEEDING = [
  {
    id: 1,
    option: "Carnivoro"
  },
  {
    id: 2,
    option: "omnivoro"
  },
  {
    id: 3,
    option: "hervivoro"
  }
];
const STATUS = [
  {
    id: 1,
    option: "saludable"
  },
  {
    id: 2,
    option: "recuperacion"
  },
  {
    id: 3,
    option: "enfermo"
  }
];

const PetForm = ({ petToUpdate }) => {
  const router = useRouter();
  const { isSubmittingForm, createPet, updatePet } = useContext(PetContext);
  const [fileImage, setFileImage] = useState({});
  const [isEditing, setIsEditng] = useState(false);
  const [petData, setPetData] = useState({
    photo: "",
    name: "",
    age: 0,
    weight: 0,
    color: "",
    status: "",
    type: "",
    feeding: "",
    feedingDetails: "",
    owner: ""
  });

  useEffect(() => {
    if (router.pathname === "/edit-pet/[id]") {
      setPetData(petToUpdate);
      return setIsEditng(true);
    }
    setIsEditng(false);
  }, [isEditing]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFileImage(e.target.files[0]);
    } else {
      setPetData({
        ...petData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing) {
      createPet(petData, fileImage);
    } else {
      updatePet(petData);
    }
  };

  return (
    <form className="max-w-[600px] mx-auto my-5" onSubmit={handleSubmit}>
      {!isEditing && (
        <div className="my-5">
          <label className="form-label">Foto</label>
          <input
            name="photo"
            type="file"
            className="input-file"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
        </div>
      )}

      <div className="my-5">
        <label className="form-label">nombre</label>
        <input
          name="name"
          type="text"
          value={petData.name}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="my-5 flex justify-between gap-5">
        <div className="w-full">
          <label className="form-label">edad (años)</label>
          <input
            name="age"
            type="number"
            value={petData.age}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="w-full">
          <label className="form-label">Peso (kg)</label>
          <input
            name="weight"
            type="number"
            value={petData.weight}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div className="my-5">
        <label className="form-label">color</label>
        <select
          name="color"
          value={petData.color}
          onChange={handleChange}
          className="select"
        >
          <option value="">-</option>
          {COLORS.map(({ id, option }) => (
            <option key={id} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="my-5">
        <label className="form-label">Estado de salud</label>
        <select
          name="status"
          value={petData.status}
          onChange={handleChange}
          className="select"
        >
          <option value="">-</option>
          {STATUS.map(({ id, option }) => (
            <option key={id}>{option}</option>
          ))}
        </select>
      </div>

      <div className="my-5 flex justify-between gap-5">
        <div className="w-full">
          <label className="form-label">Tipo</label>
          <select
            name="type"
            value={petData.type}
            onChange={handleChange}
            className="select"
          >
            <option value="">-</option>
            {PETTYPE.map(({ id, option }) => (
              <option key={id}>{option}</option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="form-label">Tipo de alimentacion</label>
          <select
            name="feeding"
            value={petData.feeding}
            onChange={handleChange}
            className="select"
          >
            <option value="">-</option>
            {FEEDING.map(({ id, option }) => (
              <option key={id}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="my-5">
        <label className="form-label">Detalles de salud y alimentacion:</label>
        <textarea
          name="feedingDetails"
          value={petData.feedingDetails}
          onChange={handleChange}
          className="input h-28"
        />
      </div>

      <input
        className={`${
          isSubmittingForm ? "btn w-full disabled-btn" : "btn w-full"
        }`}
        value={isEditing ? "Actualizar datos" : "crear mascota"}
        type="submit"
        disabled={isSubmittingForm ? true : false}
      />
    </form>
  );
};

export default PetForm;
