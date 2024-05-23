'use client'
import { UnitedStatesFlag, VenezuelanFlag, EuropeFlag } from "@/assets/country-flags";
import { Spacer, Heading, HStack } from "@chakra-ui/react";

import { useRevenue } from "@/store/useRevenue";
import { useEffect } from "react";

export default function Revenue() {
  const { VE, US, EU, update } = useRevenue();
  useEffect(() => {
    update()
  }, []);

  const todayRevenue = {
    US: {
      currency: "USD",
      amount: US.amount,
      icon: <UnitedStatesFlag size={100} />,
    },
    VE: {
      currency: "VES",
      amount: VE.amount,
      icon: <VenezuelanFlag size={100} />,
    },
    EU: {
      currency: "EU",
      amount: EU.amount,
      icon: <EuropeFlag size={100} />,
    },
  };

  return (
    <HStack
      h="40"
      maxW="100%"
      spacing={"auto"}
      justify={"space-between"}
      my="5"
      mx="10"
    >
      {Object.entries(todayRevenue).map(([key, { currency, amount, icon }]) => (
        <HStack
          key={key}
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s ease-in-out"
          boxSizing="content-box"
          spacing="2"
          display="flex"
          flexDirection="row"
          alignItems="center"
          px="2"
          py="4"
          bgColor="white"
          borderRadius="30"
          boxShadow="lg"
          minW={"fit-content"}
        >
          {icon}
          <Spacer />
          <Heading fontSize={"2xl"}>{`${amount} ${currency}`}</Heading>
        </HStack>
      ))}
    </HStack>
  );
}
