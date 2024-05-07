import { Flex, Heading, Box } from "@chakra-ui/react";
import Card from "./Card";
import IncomingBalance from "./IncomingBalance";
import Summary from "./Summary";
import { useCashierStore } from "@/store/useCashier";
import { useStockStore } from "@/store/useStock";

export default function SummaryPanel() {
  const cashier = useCashierStore((state) => state);
  const stock = useStockStore((state) => state);
  return (
    <Flex
      direction={"column"}
      w={{ base: "100%", lg: "70%" }}
      gap={8}
      py={{ base: "10vh", lg: "0%" }}
      pl={{ base: "0%", lg: "20%" }}
    >
      <Box p="4" display="flex" h="auto">
        <Heading fontWeight="regular" fontSize={"4xl"}>
          <strong>Hola!</strong>,[usuario] Bienvenido
        </Heading>
      </Box>

      <Card w={"80%"}>
        <IncomingBalance />
      </Card>

      <Card w={"50%"}>
        {/**
         * Read the Summary component
         */}
        <Summary
          type={"cashier_stats"}
          data={cashier}
          reloadContent={cashier.updateCashierStatus}
        />
      </Card>

      <Card w={"50%"}>
        <Summary
          type={"stock_stats"}
          data={stock}
          reloadContent={stock.updateStockStatus}
        />
      </Card>
    </Flex>
  );
}
