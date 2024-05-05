import { GridItem, VStack } from "@chakra-ui/react";

export default function Card({
  w,
  h,
  colStart = 1,
  children,
}: {
  w: number;
  h: number;
  colStart?: number;
  children: React.ReactNode;
}) {
  return (
    <GridItem
      rowSpan={h}
      borderRadius="15"
      colSpan={w}
      boxShadow={"lg"}
      colStart={colStart}
    >
      <VStack
        bg="teal.50"
        p="5"
        h="100%"
        w="100%"
        gap="4"
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
    </GridItem>
  );
}
