"use client";
import { Flex, Heading, Box } from "@chakra-ui/react";
import Card from "./Card";
import IncomingBalance from "./IncomingBalance";
import Summary from "./Summary";
import { useCashierStore } from "@/store/useCashier";
import { useStockStore } from "@/store/useStock";
import { User } from "@/types";
import { Suspense, useEffect, useState } from "react";
import CardSkeleton from "../ui/CardSkeleton";

/**
 * Renders the summary panel component.
 *
 * @returns The summary panel component.
 */
export default function SummaryPanel() {
  const cashier = useCashierStore((state) => state);
  const stock = useStockStore((state) => state);
  const [value, setValue] = useState<User | undefined>(undefined);

  // Retrieve the user from local storage once the component mounts and set the value
  useEffect(() => {
    const user = localStorage.getItem("user");

    // If the user exists, parse the user and set the value
    user && setValue(JSON.parse(user) as User);
  }, []);

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
          <strong>Hola</strong>, {value?.fullname} Bienvenido/a
        </Heading>
      </Box>

      <Suspense fallback={<CardSkeleton />}>
        <Card w={"80%"}>
          <IncomingBalance />
        </Card>
      </Suspense>

      <Suspense fallback={<CardSkeleton />} >
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
      </Suspense>

      <Suspense fallback={<CardSkeleton />} >
        <Card w={"50%"}>
          <Summary
            type={"stock_stats"}
            data={stock}
            reloadContent={stock.updateStockStatus}
          />
        </Card>
      </Suspense>
    </Flex>
  );
}
