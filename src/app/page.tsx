import "@/styles/landing.css";

import Heading from "@/components/landing/Title";
import Navbar from "@/components/landing/Navbar";
import Info from "@/components/landing/Information";
import CustomersFeedback from "@/components/landing/Customers";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <Heading />
      <Info />
      <CustomersFeedback />
      <footer>
        <section className="socials">
          <h1>Redes sociales</h1>
          <Link
            href="https://github.com/TauriOrg"
            className="social-logo-container"
          >
            <Image
              src="/instagram.svg"
              alt="Logo de instagram"
              height={40}
              width={40}
            />
          </Link>
          <Link
            href="https://github.com/TauriOrg"
            className="social-logo-container"
          >
            <Image
              src="/facebook.svg"
              alt="Logo de facebook"
              height={40}
              width={40}
            />
          </Link>
          <Link
            href="https://github.com/TauriOrg"
            className="social-logo-container"
          >
            <Image
              src="/github.svg"
              alt="Logo de github"
              height={40}
              width={40}
            />
          </Link>
        </section>
        <section className="policy">
          <h1>Política de privacidad</h1>
          <Link href="/sponsors">Aliados / Sponsors</Link>
          <Link href="/policy#data-usage">Uso de datos</Link>
          <Link href="/policy#cookies">Política de cookies</Link>
        </section>
        <section className="contact">
          <h1>Contáctanos</h1>
          <span className={"phone"}> +58 999 999 9999</span>
        </section>
      </footer>
    </main>
  );
}
