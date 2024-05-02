import { Heading, VStack, HStack, Text } from "@chakra-ui/react";
import GithubLogo from "@/assets/GithubLogo";

export default function ContactInfo() {
  return (
    <VStack>
      <Heading fontWeight="light" fontSize="4xl" color="teal.900">
        Contact info
      </Heading>
      <HStack>
      <GithubLogo />
      <Text fontSize="2xl"> Github org </Text>
      </HStack>
    </VStack>
  );
}
