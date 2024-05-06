import { VStack } from "@chakra-ui/react";

export default function Card({
  w,
  children,
}: {
  w: string;
  children: React.ReactNode;
}) {
  return (
    <VStack
      boxSizing="content-box"
      mx="5%"
      bg="teal.50"
      p="5"
      maxH={"auto"}
      maxW={{ sm: "100%", lg: w }}
      gap="8"
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
