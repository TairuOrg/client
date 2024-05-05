"use client";
import Card from "@/components/dashboard/Card";
import IncomingBalance from "@/components/dashboard/IncomingBalance";
import Summmary from "@/components/dashboard/Summary";

import { Flex, VStack, Grid, GridItem, Heading, Box } from "@chakra-ui/react";
import { useCashierStore } from "@/store/useCashier";
import { useStockStore } from "@/store/useStock";

export default function Home() {
  const cashier = useCashierStore((state) => state);
  const stock = useStockStore((state) => state);

  return (
    <Flex height="100vh" width="100vw">
      {/*Left panel which is sidepanel and menu */}
      <VStack
        bgColor="teal.50"
        width="20%"
        minW="400px"
        height="100%"
        minH="100vh"
      >
        <Heading>Left sidebar</Heading>
      </VStack>
      {/* Middle panel*/}
      <Grid
        padding={10}
        width="50%"
        height="100%"
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={10}
      >
        <GridItem rowSpan={1} colSpan={6}>
          <Box p="4" display="flex" h="100%">
            <Heading fontWeight="regular">Hola!,[usuario] Bienvenido</Heading>
          </Box>
        </GridItem>

        <Card h={2} w={5}>
          <IncomingBalance />
        </Card>

        <Card h={3} w={3}>
          {/**
           * Read the Summary component
           */}
          <Summmary
            type={"cashier_stats"}
            data={cashier}
            reloadContent={cashier.updateCashierStatus}
          />
        </Card>

        <Card h={3} w={3}>
          <Summmary
            type={"stock_stats"}
            data={stock}
            reloadContent={stock.updateStockStatus}
          />
        </Card>
      </Grid>
      {/*Right panel */}
      <VStack bgColor="teal.50" width="30%" height="100%">
        <Heading>Right sidebar</Heading>
      </VStack>
    </Flex>
  );
}
