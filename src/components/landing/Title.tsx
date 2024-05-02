import { Box, Flex, Heading, Highlight } from "@chakra-ui/react";
import LoginButton from "./LoginButton";

export default function Title() {
  return (
    <>
      <Heading
        size={["sm", "2xl", "3xl", "4xl"]}
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
            px: "8",
            py: "0",
            color: "teal.900",
            rounded: "25",
            bg: "teal.100",
          }}
        >
          {"crea, administra,\ny haz crecer tu negocio con Tairu"}
        </Highlight>
      </Heading>

      <Flex flexDirection='row' alignItems='baseline'>
        <Heading fontSize="3xl" fontWeight="bold" color="teal.900" padding="4" pr='0'>
          Empieza ahora e
        </Heading>

        <LoginButton />
      </Flex>
    </>
  );
}
