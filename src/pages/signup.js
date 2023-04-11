import AuthContext from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const signup = () => {
  const { loadingUserData, createUser, checkAuthStatus } =
    useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmpassword: ""
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

    //form validation
    for (const key in userData) {
      if (userData[key].trim() === "") {
        //console.log("empty", key);
        return toast.error("Todos los campos son obligatorios.");
      }
    }

    if (!regex.test(userData.email)) {
      return toast.error("Correo no valido.");
    }

    if (userData.password.trim() !== userData.confirmpassword.trim()) {
      return toast.error("Las contraseñas no coinciden.");
    }

    if (userData.password.trim() < 6 || userData.confirmpassword.trim() < 6) {
      return toast.error("Las contraseñas deben tener al menos 6 caracteres.");
    }

    createUser(userData.email, userData.password);
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
            <label className="labelform">correo:</label>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Tu correo"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label className="labelform">contraseña:</label>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Tu contraseña"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label className="labelform">confirma tu contraseña:</label>
            <input
              className="input"
              name="confirmpassword"
              type="password"
              placeholder="Tu contraseña otra vez"
              value={userData.confirmpassword}
              onChange={handleChange}
            />
          </div>
          <input className="btn w-full" value="Crear cuenta" type="submit" />
        </form>

        <div className="mt-2">
          <Link className="link" href="/login">
            Si ya tienes cuenta, inicia sesion.
          </Link>
        </div>
      </div>
    </main>
  );
};

export default signup;
