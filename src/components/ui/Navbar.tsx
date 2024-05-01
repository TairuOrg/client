import Logo from "@/assets/Logo";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      minWidth="max-content"
      gap="2"
      backgroundColor="teal.900"
    >
      <Link href="/">
        <Box paddingLeft="10" paddingTop="4" paddingBottom="2">
          <Logo />
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
