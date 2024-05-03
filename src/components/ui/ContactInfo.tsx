import { Heading, VStack, HStack, Text } from "@chakra-ui/react";
import GithubLogo from "@/assets/GithubLogo";
import Link from "next/link";
export default function ContactInfo() {
  return (
    <VStack>
      <Heading fontWeight="light" fontSize="4xl" color="teal.900">
        Contact info
      </Heading>
      <HStack>
        <GithubLogo />
        <Text fontSize="2xl">
          {" "}
          <Link href="https://github.com/TairuOrg">Github org</Link>
        </Text>
      </HStack>
    </VStack>
  );
}
