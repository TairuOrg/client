import { Flex, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function displayNotFound() {
  return (
    <Flex flexDirection='column' justifyItems='center' alignItems='center' >
      <Image src="/NotFound.png" alt="Not Found" width={1000} height={1000} />
      <Link href='/'>
        <Button fontSize='3xl' fontWeight='bold' padding='4' colorScheme="teal">
            Volver a la página principal
        </Button>
      </Link>
    </Flex>
  );
}
