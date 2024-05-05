'use client'
import useReload from "@/hooks/useReload";
import { HStack, Heading, Spacer, Button } from "@chakra-ui/react";
import { GoArrowSwitch } from "react-icons/go";
import { IoReload } from "react-icons/io5";

export default function IncomingBalance() {

  return (
    <>
      <HStack w="100%">
        <Heading fontSize="2xl" fontWeight="bold">
          {" "}
          Registro de ingresos totales hoy:
        </Heading>
        <Spacer />
        <Button bg="transparent" onClick={() => {}}>
          <IoReload size={25} />
        </Button>
      </HStack>
      <HStack>
        <Heading fontSize="2xl" fontWeight="regular" justifyContent="center">
          {" "}
          32.255,25 VES
        </Heading>
        <GoArrowSwitch />
        <Heading fontSize="2xl" fontWeight="regular" justifyContent="center">
          885,41 USD
        </Heading>
      </HStack>
    </>
  );
}
