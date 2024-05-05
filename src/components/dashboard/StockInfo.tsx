"use client";
import {
  Button,
  Heading,
  HStack,
  Spacer,
  VStack,
  Text,
} from "@chakra-ui/react";
import { CiShoppingCart } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import { CgMoreR } from "react-icons/cg";
import { useCashier } from "@/store/useCashier";

export default function Summary() {
  const cashier = useCashier((state) => state);

  return (
    <>
      <VStack w="100%" h="100%" alignItems={"start"} gap={4}>
        {/* Start of the Header of the card */}
        <HStack w="100%">
          <CiShoppingCart size={45} />
          <Heading fontWeight="regular" fontSize="2xl">
            Cuentas con:
          </Heading>
          <Spacer />
          <Button
            bg="transparent"
            onClick={() => cashier.updateCashierStatus()}
          >
            <IoReload size={25} />
          </Button>
        </HStack>
        {/* End of the Header of the card */}
        {/* Start of the Body of the card */}
        <Text fontWeight="regular" fontSize="2xl">
          [{cashier.active}] artículos
        </Text>
        <Text fontWeight="regular" fontSize="2xl">
          [{cashier.inactive}] categorías
        </Text>
        <Button bg="transparent" onClick={() => {}}>
          <HStack>
            <CgMoreR size={25} />
            <Text fontWeight="light" fontSize="2xl">
              Más detalles
            </Text>
          </HStack>
        </Button>
      </VStack>
    </>
  );
}
