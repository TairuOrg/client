import {Button, Flex } from "@chakra-ui/react";

export default function LoginButton() {
  return (
      <Flex paddingLeft='4'justifyContent="start-flex" alignItems="center" >
        <Button
          as="a"
          size="lg"
          height='50'
          href="/login"
          bg="teal.100"
          variant="solid"
          fontSize='2xl'
          
          _hover={{ color: "teal.50", variant: "solid", bg: "teal.900" }}
        >
          Iniciar Sesión
        </Button>
      </Flex>
  );
}
