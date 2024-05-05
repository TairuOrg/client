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
import { FaCaravan } from "react-icons/fa";
import { Cashier, Stock, SummaryProps } from "@/types";
// TODO: REFACTOR ME
export default function Summary({ type, data, reloadContent }: SummaryProps) {
  const label_1 = type === "cashier_stats" ? "Cajeros activos" : "Artículos";
  const label_2 = type === "cashier_stats" ? "Cajeros inactivos" : "Categorías";
  const headerLogo = type === "cashier_stats" ? <CiShoppingCart size={40} /> : <FaCaravan size={40} />;

  let content_1, content_2;

  if (type === "cashier_stats") {
    const cashierData = data as Cashier;
    content_1 = cashierData.active;
    content_2 = cashierData.inactive;
  } else {
    const stockData = data as Stock;
    content_1 = stockData.products;
    content_2 = stockData.categories;
  }

  return (
    <>
      <VStack w="100%" h="100%" alignItems={"start"} gap={4}>
        {/* Start of the Header of the card */}
        <HStack w="100%">
          {headerLogo}
          <Heading fontWeight="regular" fontSize="2xl">
            Cuentas con:
          </Heading>
          <Spacer />
          <Button
            bg="transparent"
            onClick={() => {
              reloadContent();
            }}
          >
            <IoReload size={25} />
          </Button>
        </HStack>
        {/* End of the Header of the card */}
        {/* Start of the Body of the card */}
        <Text fontWeight="regular" fontSize="2xl">
          [{content_1}] {label_1}
        </Text>
        <Text fontWeight="regular" fontSize="2xl">
          [{content_2}] {label_2}
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
