import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.socials}>
        <h1>Redes sociales</h1>
        <span className="flex flex-row gap-2">
          <Link
            href="https://github.com/TauriOrg"
            className={styles.social_logo_container}
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
            className={styles.social_logo_container}
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
            className={styles.social_logo_container}
          >
            <Image
              src="/github.svg"
              alt="Logo de github"
              height={40}
              width={40}
            />
          </Link>
        </span>
      </section>
      <section className={styles.policy}>
        <h1>Política de privacidad</h1>
        <Link href="/sponsors">
          <h1>Aliados / Sponsors</h1>
        </Link>
        <Link href="/policy#data-usage">
          <h1>Uso de datos</h1>
        </Link>
        <Link href="/policy#cookies">
          <h1>Política de cookies</h1>
        </Link>
      </section>
      <section className={styles.contact}>
        <h1>Contáctanos</h1>
        <span className={"phone"}> +58 999 999 9999</span>
      </section>
    </footer>
  );
}
