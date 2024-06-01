import "@/styles/landing.css";
import Heading from "@/components/landing/Title";
import Navbar from "@/components/landing/Navbar";
import Info from "@/components/landing/Information";
import Logo from "@/assets/Logo";
export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <Heading />
      <Info />
      <section className="customers">
        <h1>
          Nuestros clientes <br />
        </h1>
        <div className="customer-logos">
          <div>
            <Logo h={100} w={100} />
          </div>
          <div>
            <Logo h={100} w={100} />
          </div>
          <div>
            <Logo h={100} w={100} />
          </div>
        </div>
      </section>
    </main>
  );
}
