import { VStack } from "@chakra-ui/react";

export default function Card({
  w,
  bg = "teal.50",
  children,
}: {
  w: string;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <VStack
      boxSizing="content-box"
      mx="5%"
      bg={bg}
      p="5"
      h={"auto"}
      minW={"auto"}
      maxW={{ sm: "100%", lg: w }}
      gap="6"
      align="flex-start"
      justify="center"
      borderRadius="15"
      borderWidth="1px"
      borderColor="teal.500"
      _hover={{ transform: "scale(1.02)", boxShadow: "md" }}
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
    >
      {children}
    </VStack>
  );
}
