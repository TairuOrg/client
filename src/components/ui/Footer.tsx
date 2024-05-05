import { VStack, Text, Heading, HStack } from "@chakra-ui/react";
import ReactLogo from "@/assets/ReactLogo";
import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { VscHeart } from "react-icons/vsc";
export default function Footer() {
  return (
    <VStack>
      <Heading fontWeight="light" fontSize="4xl" color="teal.900">
        Made with
      </Heading>
      <HStack>
        <Link href="https://react.dev?uwu=true">
          <FaReact size={45} />
        </Link>
        <VscHeart size={45} />
      </HStack>
    </VStack>
  );
}
