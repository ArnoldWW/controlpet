import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

const login = () => {
  const { loadingUserData, checkAuthStatus, signIn } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    checkAuthStatus(true, false);
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    //validation for form
    for (const key in userData) {
      if (userData[key].trim() === "") {
        console.log("empty", key);
        return toast.error("Todos los campos son obligatorios.");
      }
    }

    if (!regex.test(userData.email)) {
      return toast.error("Correo no valido.");
    }

    if (userData.password < 6) {
      return toast.error("La contraseña debe tener al menos 6 caracteres.");
    }

    signIn(userData.email, userData.password);
  };

  if (loadingUserData === 0) {
    return <h1>loading...</h1>;
  }

  return (
    <main className="block min-w-full min-h-screen">
      <div className="flex justify-center flex-col min-h-screen mx-auto max-w-[90%] w-[400px]">
        <div className="mx-auto">
          <Image src="/logo3.svg" alt="logo" width="150" height="150" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="form-label">correo:</label>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Ej. jhon@gmail.com"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label className="form-label">contraseña:</label>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Tu contraseña"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <input className="btn w-full" value="inciar sesion" type="submit" />
        </form>

        <div className="mt-2">
          <Link href="/signup" className="link">
            Crea tu cuenta
          </Link>
        </div>
      </div>
    </main>
  );
};

export default login;
