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

export default function SideMenu() {
  const CardInformation = {
    stock: {
      icon: <FiTruck size={40} />,
      amount: ["45 Artículos", "1 Categorías"],
      details: "/admn/stock",
    },
    cashier: {
      icon: <FiUsers size={40} />,
      amount: ["0 Cajeros activos", "0 Cajeros inactivos"],
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
                  <Text
                    fontWeight="light"
                    fontSize={{ base: "2xl", lg: "3xl" }}
                  >
                    Más detalles
                  </Text>
                </HStack>
              </Button>
            </VStack>
          )
        )}
      </Box>
    </Flex>
  );
}
