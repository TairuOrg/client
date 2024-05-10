import Logo from "@/assets/Logo";
import { Flex, Heading, Spacer, Checkbox } from "@chakra-ui/react";

export default function LogoSection({ handleCheckbox} : {handleCheckbox: () => void}){
  return (
      <Flex
        direction="column"
        justifyContent="center"
        height="100%"
        width="50%"
        alignItems="center"
      >
        <Flex
          direction="column"
          marginY="5%"
          height="100%"
          bgColor="teal.900"
          width="80%"
          borderRadius="30"
          justifyContent="start"
          alignItems="center"
          gap="3em"
          paddingTop="25%"
        >
          <Logo h={250} w={250} /> {/* Logo component */}
          <Heading color="teal.50" size="3xl">
            Bienvenido
          </Heading>
          <Spacer />
          <Flex
            direction="row"
            height="8%"
            width="90%"
            bgColor="teal.50"
            borderRadius="20"
            marginBottom="5%"
          >
            <Checkbox
              onChange={() => handleCheckbox()}
              mx="5%"
              w="100%"
              justifyContent="center"
              size="lg"
              color="teal.900"
            >
              ¿Iniciar sesión como administrador?
            </Checkbox>
          </Flex>
        </Flex>
      </Flex>
  );
}
