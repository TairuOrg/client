import Image from "next/image";

export default function LogoCircle() {
  return (
    <Image
      src="/logo-circle.svg"
      alt="Logo de Tairu"
      width={250}
      height={250}
    />
  );
}