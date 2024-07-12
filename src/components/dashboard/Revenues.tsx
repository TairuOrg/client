'use client'
import { UnitedStatesFlag, VenezuelanFlag, EuropeFlag } from "@/assets/country-flags";
import { Spacer, Heading, HStack, Spinner } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { retrieveRevenues } from "@/actions/revenues";

export default function Revenue() {
  const [isLoading, setIsLoading] = useState(true);
  const [revenues, setRevenues] = useState({
    VE: { amount: 'cargando...'},
    US: { amount: 'cargando...'},
    EU: { amount: 'cargando...'},
  })
  useEffect(()=> {
    retrieveRevenues().then(rev => {
      setRevenues(rev.body.payload)
      setIsLoading(false)
    })
  }, [])

  const todayRevenue = {
    US: {
      currency: "USD",
      amount: isLoading ? <Spinner /> : revenues.US.amount,
      icon: <UnitedStatesFlag size={100} />,
    },
    VE: {
      currency: "VES",
      amount: isLoading ? <Spinner /> : revenues.VE.amount,
      icon: <VenezuelanFlag size={100} />,
    },
    EU: {
      currency: "EU",
      amount: isLoading ? <Spinner /> : revenues.EU.amount,
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
          <Heading fontSize={"2xl"}>
            {amount} {`${currency}`}
          </Heading>
        </HStack>
      ))}
    </HStack>
  );
}
