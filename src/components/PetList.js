import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const PetList = ({ pets }) => {
  useEffect(() => {
    console.log(pets);
  }, []);

  if (pets.length === 0) {
    return <p>No hay mascotas</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-5">
      {pets?.map((pet) => (
        <li key={pet.id} className="border  p-5 flex gap-3">
          <div>
            <Image
              src={pet.photo}
              alt={`foto de ${pet.name}`}
              width={150}
              height={150}
              className="object-cover w-32 h-32"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-4">
            <p className="text-lg font-bold capitalize">
              {pet.name} ({pet.status})
            </p>
            <Link className="block btn text-center" href={`/pet/${pet.id}`}>
              Ver Detalles
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PetList;
