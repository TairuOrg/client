"use client";
import Logo from "@/assets/Logo";
import { Box, Heading } from "@chakra-ui/react";
import { User } from "@/types";
import { useState, useEffect } from "react";
import { retrieveUserInfo } from "@/actions/retrieveUserInfo";

export default function MainPanelHeader() {
 
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      retrieveUserInfo().then((user) => {
        setUser(user);
      });
    })();
  }, []);

  return (
    <Heading fontWeight="regular" display="flex" alignItems={"center"} mt='10'>
      <Box w="125px" pl="10" mr ="5px">
        <Logo h={100} w={100} />
      </Box>
      <strong style={{ marginRight: "10px" }}>¡Hola!</strong>{user?.name}, aquí
      tienes tu resumen:
    </Heading>
  );
}
