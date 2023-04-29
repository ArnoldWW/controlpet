import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import Logo from "./Logo";

const Header = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <header className="container py-2 my-10 border-b flex justify-between w-full">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex items-center list-none">
        <li className="p-2">
          <Link href="/" className="hover:underline">
            Mis Mascotas
          </Link>
        </li>
        <li className="p-2">
          <Link href="/contact">Contact</Link>
        </li>
        <button onClick={logOut} className="btn ml-3">
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Header;
