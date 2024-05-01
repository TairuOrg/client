import { Box, Button, Flex } from "@chakra-ui/react";

export default function LoginButton() {
  return (
    <Box w="25%" ml="11%">
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Button
          as="a"
          size="lg"
          href="/login"
          colorScheme="teal.900"
          variant="outline"
          fontSize='2xl'
          _hover={{ color: "teal.50", variant: "solid", bg: "teal.900" }}
        >
          Iniciar Sesión
        </Button>
      </Flex>
    </Box>
  );
}
