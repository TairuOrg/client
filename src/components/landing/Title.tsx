import Logo from "@/assets/Logo";
import "@/styles/title.css"
export default function Heading() {
  return (
    <>
       <section className="hero">
          <div className="background-circle">
          <Logo h={200} w={200} />
          </div>
          <h1>
            Crea, administra <br />
            y haz crecer tu negocio <br />
            con Tairu
          </h1>
        </section>
    </>
  );
}
