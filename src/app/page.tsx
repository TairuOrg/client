import Hero from "@/assets/Hero";
import Title from "@/components/landing/Title";
import Navbar from "@/components/ui/Navbar";

import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Flex
        overflowY="hidden"
        flexDirection="column"
        backgroundColor="teal.50"

        height="100vh"
        width="100vw"
      >
        <Navbar />
        <Flex
          paddingX="50"
          flexDirection="row"
          flex='1'

        >
          <Flex direction="column" width='80%' justifyContent="center">
            <Title />
          </Flex>
  
          <Hero />

        </Flex>
      </Flex>
    </>
  );
}
