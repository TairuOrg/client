import Hero from "@/assets/Hero";
import Title from "@/components/landing/Title";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import "@/styles/landing.css";
import { Flex, Heading } from "@chakra-ui/react";
import LogoCircle from "@/assets/logo-circle";

export default function Home() {
  return (
    <>
      <main className="main">
        <nav className="navbar" >
          <ul>
            <li>
              <Link href="/login">
                Inicia sesión
              </Link>
            </li>
            <li>
              <Link href='/about-us'>
                Sobre nosotros
              </Link>
            </li>
          </ul>
        </nav>
        <section className="hero">
          <LogoCircle />
          <h1>
            Crea, administra <br />
            y haz crecer tu negocio <br />
            con Tairu
          </h1>
        </section>
      </main>
    </>
  );
}
