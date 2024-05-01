import Hero from "@/assets/Hero";
import Title from "@/components/landing/Title";
import Navbar from "@/components/ui/Navbar";

import { Flex, Spacer } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Flex
        overflowY="hidden"
        flexDirection="column"
        backgroundColor="teal.50"
        minHeight="100vh"
      >
        <Navbar />
        <Flex
          paddingX="60"
          flexDirection="row"
          minHeight="90vh"
          minWidth="90vw"
        >
          <Flex direction="column" justifyContent="center" maxWidth="50vw">
            <Title />
          </Flex>
          <Spacer />
          <Hero />
        </Flex>
      </Flex>
    </>
  );
}
