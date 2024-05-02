import Header from "@/components/about-us/Header";
import { Flex, Divider, Heading, Stack, Spacer } from "@chakra-ui/react";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";

export default function Page() {
  return (
    <Flex
      overflowY="hidden"
      flexDirection="column"
      backgroundColor="teal.50"
      height="100vh"
      width="100vw"
    >
      <Navbar />
      {/* Information about us */}
      <Flex flexDirection="row" height="100%">
        <Flex width="70%" height="100%">
          <Flex
            flexDirection="column"
            width="100%"
            justifyContent="start"
            paddingTop="10%"
            paddingX="5%"
          >
            <Heading fontSize="7xl" fontWeight="bold" color="teal.900">
              ¿Quiénes somos?
            </Heading>

            <Heading
              paddingY="5%"
              fontSize={["4xl", "2xl"]}
              fontWeight="light"
              color="teal.900"
              style={{ whiteSpace: "pre-line", lineHeight: "1.3em" }}
            >
              {
                "En Tairu, nos dedicamos apasionadamente a la creación de software de alta calidad que satisfaga las necesidades de nuestros clientes con precisión y eficiencia. \n Recientemente, nos embarcamos en un emocionante proyecto para desarrollar un sistema de gestión de stock diseñado específicamente para supermercados.\n\n Nuestro objetivo es proporcionar una solución integral que permitiera a los supermercados gestionar fácilmente los ingresos y salidas de stock, al tiempo que generaba informes estadísticos detallados sobre el comportamiento de los clientes.\n\n\n"
              }
            </Heading>
          </Flex>
        </Flex>
        {/* Contact info */}

        <Flex width="30%" height="100%">
          <Flex
            flexDirection="column"
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Stack  borderLeftWidth='3px' alignItems='center' borderColor='teal.900'  spacing='3em' direction="column" h="40%" px="10%">

              <Sidebar />
            </Stack>
          </Flex>
        </Flex>
      </Flex> 
    </Flex>
  );
}
