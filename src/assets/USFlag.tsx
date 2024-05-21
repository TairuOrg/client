import Image from "next/image";

export default function UnitedStatesFlag({ size }: { size: number }) {
  return <Image src="/us-flag.svg" width={size} height={size} alt="US Flag" />;
}
