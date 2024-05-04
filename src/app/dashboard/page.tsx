import {
  Flex,
  Divider,
  VStack,
  Grid,
  GridItem,
  Heading,
  HStack,
  Box,
} from "@chakra-ui/react";
import Exchange from "@/assets/Exchange";

export default function Home() {
  return (
    <Flex height="100vh" width="100vw">
      {/*Left panel which is sidepanel and menu */}
      <VStack bgColor="red" width="20%" height="100%">
        aqui toi
      </VStack>
      {/* Middle panel*/}
      <Grid
        padding={10}
        width="50%"
        height="100%"
        templateColumns="repeat(10, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={10}
      >
        <GridItem rowSpan={1} colSpan={10}>
          <Box p="4" display="flex" h="100%">
            <Heading fontWeight="regular">Hola!,[usuario] Bienvenido</Heading>
          </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={8}>
          <VStack
            bg="teal.50"
            p="10"
            h="100%"
            w="100%"
            gap="5"
            align="flex-start"
            justify="center"
            borderRadius="15"
            borderWidth="1px"
            borderColor="teal.500"
          >
            <Heading fontSize="2xl" fontWeight="bold">
              {" "}
              Registro de ingresos totales hoy:
            </Heading>

            <HStack>
              <Heading
                fontSize="2xl"
                fontWeight="regular"
                justifyContent="center"
              >
                {" "}
                32.255,25 VES
              </Heading>
              <Exchange />
              <Heading
                fontSize="2xl"
                fontWeight="regular"
                justifyContent="center"
              >
                885,41 USD
              </Heading>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem borderRadius="20" rowSpan={3} colSpan={6} bg="red.100" />
        <GridItem borderRadius="20" rowSpan={3} colSpan={6} bg="red.700" />
      </Grid>
      {/*Right panel */}
      <VStack bgColor="purple" width="30%" height="100%"></VStack>
    </Flex>
  );
}
