import Image from "next/image";
import styles from '@/styles/info.module.css'
export default function Hero({w, h, visible}: {w: number, h: number, visible: string}) {
  return (
    <div>
      <Image
      className={`${styles.hero_image} ${visible}`}
      src="/hero.svg"
      height={h}
      width={w}
      alt="Hero image for the page"
    />
    </div>
  );
}
