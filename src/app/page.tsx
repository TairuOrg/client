import Hero from "@/assets/Hero";
import Title from "@/components/landing/Title";
import Navbar from "@/components/ui/Navbar";

import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
    {/* Main container */}
      <Flex
        overflowY="hidden"
        flexDirection="column"
        backgroundColor="teal.50"
        height="100vh"
        width="100vw"
      >
        {/* Navbar goes on top of the page and takes approximately 10% of the whole horizontal viewport*/}
        <Navbar />
        <Flex paddingX="50" flexDirection="row" height="100%">
          <Flex direction="column" width="60%" justifyContent="center">
            <Title />
          </Flex>

          <Flex direction='column' justifyContent='center' width='40%'>
            <Hero />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
