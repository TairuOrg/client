import { Box, HStack } from "@chakra-ui/react";

export default function CashierPage() {
  return (
    <HStack>
      <Box
        bg={{ base: "red.500", md: "blue.500" }}
        p={{ base: 4, md: 8 }}
        fontSize={{ base: "md", md: "4xl" }}
        textAlign={{ base: "center", md: "left" }}
      >
        This box has different styles based on the screen size.
      </Box>
      <Box bg="blue.200" w="100%">
        This is a box
      </Box>
    </HStack>
  );
}
