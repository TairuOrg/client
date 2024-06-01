import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar crystalize">
      <ul>
        <li>
          <Link href="/login">Inicia sesión</Link>
        </li>
        <li>
          <Link href="/about-us">Sobre nosotros</Link>
        </li>
      </ul>
    </nav>
  );
}
