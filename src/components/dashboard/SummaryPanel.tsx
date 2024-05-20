"use client";
import { Flex, Heading, Box, SkeletonText } from "@chakra-ui/react";
import Card from "./Card";
import IncomingBalance from "./IncomingBalance";
import Summary from "./Summary";
import { useCashierStore } from "@/store/useCashier";
import { useStockStore } from "@/store/useStock";
import { User } from "@/types";
import { Suspense, useEffect, useState } from "react";
import CardSkeleton from "../ui/CardSkeleton";
import { retrieveUserInfo } from "@/actions/retrieveUserInfo";
/**
 * Renders the summary panel component.
 *
 * @returns The summary panel component.
 */
export default function SummaryPanel() {
  const cashier = useCashierStore((state) => state);
  const stock = useStockStore((state) => state);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true); // Step 1: Add loading state

  // Retrieve the user from local storage once the component mounts and set the value
  useEffect(() => {
    (async () => {
      retrieveUserInfo().then((user) => {
        setUser(user);
        setIsLoading(false); // Step 6: Update loading state once user is loaded
      });
    })();
  }, []);

  return (
    <Flex
      direction={"column"}
      w={{ base: "100%", lg: "70%" }}
      gap={8}
      py={{ base: "10vh", lg: "0%" }}
      pl={{ base: "0%", lg: "20%" }}
    >
      <Box
        p="4"
        display="flex"
        flexDirection="row"
        alignItems={"center"}
        h="auto"
      >
        <Heading fontWeight="regular" fontSize={"4xl"}>
          {isLoading ? (
            <SkeletonText
              m="1"
              noOfLines={1}
              skeletonHeight="4"
              height="10px"
              startColor="gray.200"
              endColor="gray.400"
              w="600px"
            />
          ) : (
            <>
              {" "}
              <strong>Hola</strong>, {user?.name} Bienvenido/a{" "}
            </>
          )}
        </Heading>
      </Box>

      <Suspense fallback={<CardSkeleton />}>
        <Card w={"80%"}>
          <IncomingBalance />
        </Card>
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
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

      <Suspense fallback={<CardSkeleton />}>
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
