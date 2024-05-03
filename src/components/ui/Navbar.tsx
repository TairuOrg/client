import Logo from "@/assets/Logo";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Flex
      height='10vh'
      flexDirection="row"
      alignItems="center"
      backgroundColor="teal.900"
    >
      <Link href="/">
        <Box paddingLeft="10" paddingTop="2" paddingBottom="2">
          <Logo h={80} w={80}/>
        </Box>
      </Link>
      
      <Spacer />

      <Box paddingRight="10">
        <Heading color="teal.50" as="h2" size="lg">
          <Link href="/about-us">Acerca de nosotros</Link>
        </Heading>
      </Box>
    </Flex>
  );
}
