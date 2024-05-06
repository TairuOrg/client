'use client'
import { HStack, Heading, Spacer, Button } from "@chakra-ui/react";
import { GoArrowSwitch } from "react-icons/go";
import { IoReload } from "react-icons/io5";

export default function IncomingBalance() {

  return (
    <>
      <HStack w="100%" maxH='150px' minH='auto'>
        <Heading fontSize={{base: '2xl', lg:"3xl"}} fontWeight="bold">
          {" "}
          Registro de ingresos totales hoy:
        </Heading>
        <Spacer />
        <Button bg="transparent" onClick={() => {}}>
          <IoReload size={25} />
        </Button>
      </HStack>
      {/* <Spacer /> */}
      <HStack >
        <Heading fontSize={{base: '2xl', lg:"3xl"}} fontWeight="regular" justifyContent="center">
          {" "}
          32.255,25 VES
        </Heading>
        <GoArrowSwitch size={25}/>
        <Heading fontSize={{base: '2xl', lg:"3xl"}} fontWeight="regular" justifyContent="center">
          885,41 USD
        </Heading>
      </HStack>
    </>
  );
}
