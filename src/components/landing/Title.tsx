import { Box, Flex, Heading, Highlight } from "@chakra-ui/react";
import LoginButton from "./LoginButton";

export default function Title() {
  return (
    <>
      <Heading
        fontSize={{ base: "3xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
        color="teal.900"
        padding="4"
        style={{
          whiteSpace: "pre-line",
          lineHeight: "1.45em",
        }}
      >
        <Highlight
          query={["Tairu", "Crea,", "Negocio", "administra"]}
          styles={{
            px: { base: "1", sm: "1", md: "2" },
            py: "0",
            color: "teal.900",
            rounded: {base: "10", sm: "15", md:"25"},
            bg: "teal.100",
          }}
        >
          {"Crea, Administra,\ny haz crecer tu Negocio\n con Tairu"}
        </Highlight>
      </Heading>

      <Box
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="baseline"
      >
        <Heading
          fontSize="3xl"
          fontWeight="bold"
          color="teal.900"
          padding="4"
          pr="0"
        >
          Empieza ahora e
        </Heading>

        <LoginButton />
      </Box>
    </>
  );
}
