import Image from "next/image";

export default function VenezuelanFlag({ size }: { size: number }) {
  return <Image src="/ve-flag.svg" width={size} height={size} alt="US Flag" />;
}
