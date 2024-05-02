import { VStack, Text, Heading, HStack } from "@chakra-ui/react";
import ReactLogo from "@/assets/ReactLogo";

export default function Footer() {
  return (
    <VStack>
      <Heading fontWeight="light" fontSize="4xl" color="teal.900">
        Made with
      </Heading>
      <HStack>
        <ReactLogo />
        <Text fontSize="4xl"> 🩵 </Text>
      </HStack>
    </VStack>
  );
}
