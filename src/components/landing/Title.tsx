import { Heading, Highlight } from "@chakra-ui/react";
import LoginButton from "./LoginButton";

export default function Title() {
  return (
    <>
      <Heading
        lineHeight="tall"
        size="4xl"
        color="teal.900"
        paddingLeft="10"
        style={{ whiteSpace: "pre-line", paddingLeft: "10" }}
      >
        <Highlight
          query={["Tairu", "Crea,", "Negocio", 'administra']}
          styles={{
            px: "8",
            py: "1",
            color: "teal.900",
            rounded: "20",
            bg: "teal.100",
          }}
        >
          {" Crea, administra, \n y Haz crecer tu Negocio con Tairu"}
        </Highlight>
      </Heading>

      <Heading
        fontSize="4xl"
        fontWeight="bold"
        color="teal.900"
        paddingY="4"
        paddingLeft="10"
      >
        ¡Empieza ahora e inicia sesión!
      </Heading>
      
      <LoginButton />
    </>
  );
}
