import Image from "next/image";

export default function Hero({w, h, visible}: {w: number, h: number, visible: string}) {
  return (
    <div>
      <Image
      className={`hero-image ${visible}`}
      src="/hero.svg"
      height={h}
      width={w}
      alt="Hero image for the page"
    />
    </div>
  );
}
