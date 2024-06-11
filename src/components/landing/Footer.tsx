import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-row w-full h-[415px] bg-teal-800 pt-[100px] justify-evenly text-[30px] text-teal-100">
      <section className="flex flex-col gap-2 text-[30px]">
        <h1>Redes sociales</h1>
        <span className="flex flex-row gap-4 justify-center">
          <Link href="https://github.com/TauriOrg">
            <Image
              src="/instagram.svg"
              alt="Logo de instagram"
              height={40}
              width={40}
            />
          </Link>
          <Link href="https://github.com/TauriOrg">
            <Image
              src="/github.svg"
              alt="Logo de github"
              height={40}
              width={40}
            />
          </Link>
        </span>
      </section>
      <section>
        <h1>Política de privacidad</h1>
        <span className="flex flex-col">
          <Link href="/sponsors">
            <h1>Aliados / Sponsors</h1>
          </Link>
          <Link href="/policy#data-usage">
            <h1>Uso de datos</h1>
          </Link>
          <Link href="/policy#cookies">
            <h1>Política de cookies</h1>
          </Link>
        </span>
      </section>
      <section>
        <h1>Contáctanos</h1>
        <span className={"phone"}> +58 999 999 9999</span>
      </section>
    </footer>
  );
}
