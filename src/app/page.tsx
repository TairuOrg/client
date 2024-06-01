import "@/styles/landing.css";

import Heading from "@/components/landing/Title";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/assets/Hero";
export default function Home() {
  return (
    <>
      <main className="main">
        <Navbar />
        <Heading />
        <section className="info">
          <h1>
            Interfaz amigable y fácil de usar <br />
          </h1>
          <Hero w={800} h={800}/>
        </section>
      </main>
    </>
  );
}
