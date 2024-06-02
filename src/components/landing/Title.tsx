import Logo from "@/assets/Logo";
import styles from "@/styles/title.module.css"
export default function Heading() {
  return (
    <>
       <section className={styles.hero}>
          <div className={styles.background_circle}>
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
