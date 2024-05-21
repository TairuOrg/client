import UnitedStatesFlag from "@/assets/USFlag";
import VenezuelanFlag from "@/assets/VEFlag";
import { Spacer, Heading, HStack } from "@chakra-ui/react";

export default function Revenue() {
  const todayRevenue = {
    US: {
      currency: "USD",
      amount: "885.45",
      icon: <UnitedStatesFlag size={100} />,
    },

    VES: {
      currency: "VES",
      amount: "32.554,55",
      icon: <VenezuelanFlag size={100} />,
    },
    // need to finish
    EU: {
      currency: "EU",
      amount: "825",
      icon: <VenezuelanFlag size={100} />,
    },
  };
  return (
    <HStack h="20%">
      {Object.entries(todayRevenue).map(([key, { currency, amount, icon }]) => (
        <HStack
          key={key}
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s ease-in-out"
          boxSizing="content-box"
          spacing="2"
          ml="5"
          display="flex"
          flexDirection="row"
          alignItems="center"
          p="4"
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