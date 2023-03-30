import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </nav>
    </div>
  );
};

export default Header;
