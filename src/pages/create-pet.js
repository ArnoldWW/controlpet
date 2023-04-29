import Layout from "@/components/Layout";
import PetContext from "@/context/PetContext";
import { useContext, useEffect, useState } from "react";

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
    option: "mamifero"
  },
  {
    id: 2,
    option: "reptil"
  },
  {
    id: 3,
    option: "anfibio"
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
    option: "aracnido"
  },
  {
    id: 7,
    option: "artópodo"
  },
  ,
  {
    id: 8,
    option: "insecto"
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

const CreatePet = () => {
  const { createPet } = useContext(PetContext);
  const [petData, setPetData] = useState({
    photo:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "",
    age: 0,
    weight: 0,
    color: "",
    status: "",
    type: "",
    feeding: "",
    feedingDetails: ""
  });

  const handleChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPet(petData);
  };

  return (
    <Layout>
      <h1 className="heading1 text-center">Crea una nueva mascota</h1>

      <form className="max-w-[600px] mx-auto my-5" onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="form-label">Foto</label>
          <input name="photo" type="file" className="input-file" />
        </div>

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

        <div className="my-5">
          <label className="form-label">edad (años)</label>
          <input
            name="age"
            type="number"
            value={petData.age}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="my-5">
          <label className="form-label">Peso (kg)</label>
          <input
            name="weight"
            type="number"
            value={petData.weight}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="my-5">
          <label className="form-label">color</label>
          <select name="color" onChange={handleChange} className="select">
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
          <select name="status" onChange={handleChange} className="select">
            <option value="">-</option>
            {STATUS.map(({ id, option }) => (
              <option key={id}>{option}</option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label className="form-label">Tipo</label>
          <select name="type" onChange={handleChange} className="select">
            <option value="">-</option>
            {PETTYPE.map(({ id, option }) => (
              <option key={id}>{option}</option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label className="form-label">Tipo de alimentacion</label>
          <select name="feeding" onChange={handleChange} className="select">
            <option value="">-</option>
            {FEEDING.map(({ id, option }) => (
              <option key={id}>{option}</option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label className="form-label">Detalles sobre la alimentacion</label>
          <textarea
            name="feedingDetails"
            onChange={handleChange}
            className="input h-28"
          />
        </div>

        <input className="btn w-full" value="crear mascota" type="submit" />
      </form>
    </Layout>
  );
};

export default CreatePet;
