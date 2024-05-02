import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <Image
      src="/hero.png"
      height="300"
      width="300"
      alt="Hero image for the page"
      layout="responsive"
    />
    </div>
  );
}
