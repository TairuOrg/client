"use client";
import {
  Box,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { CgMoreR } from "react-icons/cg";
import { FiTruck , FiUsers } from "react-icons/fi";
import { useState, useEffect } from "react";

import { ItemsAndCategoriesCount } from "@/types";
import Link from "next/link";
import {
  useCashierStatus,
  useItemsAndCategories,
} from "@/store/useSideMenuReload";

export default function SideMenu() {
  const {
    active_cashiers,
    inactive_cashiers,
    update: updateCashier,
  } = useCashierStatus();
  const {
    categories,
    items,
    update: updateItemsAndCategories,
  } = useItemsAndCategories();

  useEffect(() => {
    (async () => {
      await updateCashier();
      await updateItemsAndCategories();
    })();
  }, []);
  const CardInformation = {
    stock: {
      icon: <FiTruck size={40} />,
      amount: [`${items} Artículos`, `${categories} Categorías`],
      details: "/admin/stock",
    },
    cashier: {
      icon: <FiUsers size={40} />,
      amount: [
        `${active_cashiers} Cajeros activos`,
        `${inactive_cashiers} Cajeros inactivos`,
      ],
      details: "/admin/cashier",
    },
  };
  return (
    <Flex mr="10" h="100%" maxW="40%" minW="400px">
      <Box
        p="5"
        boxSizing="content-box"
        minH="-webkit-fit-content"
        w="100%"
        my="auto"
        bgColor="white"
        borderRadius={30}
        boxShadow={"lg"}
      >
        {Object.entries(CardInformation).map(
          ([key, { icon, amount, details }]) => (
            <VStack
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.3s ease-in-out"
              key={key}
              alignItems={"start"}
              p="5"
              borderWidth="5"
              borderColor={"black"}
              bgColor="teal.50"
              m="5"
              borderRadius="20"
              boxShadow={"md"}
            >
              <HStack>
                {icon}
                <Heading fontSize="3xl" fontWeight={"regular"}>
                  {" "}
                  Cuentas con :{" "}
                </Heading>
              </HStack>
              <Text
                fontWeight="regular"
                fontSize="2xl"
                style={{ whiteSpace: "pre-line" }}
              >
                {[amount[0]]} {"\n"} {[amount[1]]}
              </Text>
              <Button bg="transparent">
                <HStack>
                  <CgMoreR size={25} />
                  <Link href={details}>
                    <Text
                      fontWeight="light"
                      fontSize={{ base: "2xl", lg: "3xl" }}
                    >
                      Más detalles
                    </Text>
                  </Link>
                </HStack>
              </Button>
            </VStack>
          )
        )}
      </Box>
    </Flex>
  );
}

function fetchInformation() {
  throw new Error("Function not implemented.");
}
