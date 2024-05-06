"use client";
import Card from "@/components/dashboard/Card";
import IncomingBalance from "@/components/dashboard/IncomingBalance";
import Summmary from "@/components/dashboard/Summary";

import {
  Flex,
  VStack,
  Heading,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useCashierStore } from "@/store/useCashier";
import { useStockStore } from "@/store/useStock";

export default function Home() {
  const isMediumScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: false,
  });
  const cashier = useCashierStore((state) => state);
  const stock = useStockStore((state) => state);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      width="100vw"
      overflowY={"auto"}
    >
      {/*Left panel which is sidepanel and menu */}
      <VStack
        bgColor="teal.50"
        w={{ base: "100%", lg: "20%" }}
        h={{ base: "10vh", lg: "100%" }}
        position={"fixed"}
        left={0}
        
      >
        <Heading>Left sidebar</Heading>
      </VStack>

      {/* Middle panel*/}
      <Flex
        direction={"column"}
        w={{ base: "100%", lg: "70%" }}
        gap={8}
        py={{ base: "10vh", lg: "0%" }}
        pl={{ base: "0%", lg: "20%" }}
      >
        <Box p="4" display="flex" h="auto">
          <Heading fontWeight="regular">Hola!,[usuario] Bienvenido</Heading>
        </Box>

        <Card w={"80%"}>
          <IncomingBalance />
        </Card>

        <Card w={"50%"}>
          {/**
           * Read the Summary component
           */}
          <Summmary
            type={"cashier_stats"}
            data={cashier}
            reloadContent={cashier.updateCashierStatus}
          />
        </Card>

        <Card w={"50%"}>
          <Summmary
            type={"stock_stats"}
            data={stock}
            reloadContent={stock.updateStockStatus}
          />
        </Card>
      </Flex>
      {!isMediumScreen && (
        <Flex w="30%" bg="peru">
          {/* Flex content */}
        </Flex>
      )}
    </Flex>
  );
}
