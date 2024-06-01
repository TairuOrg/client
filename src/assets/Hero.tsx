import Image from "next/image";

export default function Hero({w, h}: {w: number, h: number}) {
  return (
    <div>
      <Image
      src="/hero.svg"
      height={h}
      width={w}
      alt="Hero image for the page"
    />
    </div>
  );
}
