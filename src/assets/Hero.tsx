import Image from "next/image";

export default function Hero() {
  return (
    <Image
      src="/hero.png"
      height="500"
      width="700"
      alt="Hero image for the page"
    />
  );
}
