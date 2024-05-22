import Logo from "@/assets/Logo";
import { Box, Heading } from "@chakra-ui/react";

export default function MainPanelHeader() {
  return (
    <Heading fontWeight="regular" display="flex" alignItems={"center"} mt='10'>
      <Box w="125px">
        <Logo h={100} w={100} />
      </Box>
      <strong style={{ marginRight: "10px" }}>¡Hola!</strong> Alejandro, aquí
      tienes tu resumen:
    </Heading>
  );
}
