import Link from "next/link";
import styles from "@/styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/login">Inicia sesión</Link>
        </li>
        <li>
          <Link href="/sign-up"> Regístrate </Link>
        </li>
        <li>
          <Link href="/about-us">Sobre nosotros</Link>
        </li>
      </ul>
    </nav>
  );
}
