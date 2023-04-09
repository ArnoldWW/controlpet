import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <div>
      <nav>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>

        <button onClick={logOut}>Cerrar Sesion</button>
      </nav>
    </div>
  );
};

export default Header;
