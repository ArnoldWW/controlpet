import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import Logo from "./Logo";

const Header = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <header className="container py-2 my-10 border-b flex justify-between w-full sticky top-0 bg-white">
      <Link href="/">
        <Logo />
      </Link>
      <ul className="flex items-center list-none">
        <li className="p-2">
          <Link href="/" className="hover:underline">
            Mis Mascotas
          </Link>
        </li>
        <button
          onClick={() => {
            logOut();
          }}
          className="btn ml-3"
        >
          Cerrar Sesion
        </button>
      </ul>
    </header>
  );
};

export default Header;
