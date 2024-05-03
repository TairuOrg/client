'use client'
import { Flex, Heading, Spacer, Checkbox } from "@chakra-ui/react";
import Logo from "@/assets/Logo";
import { useState } from "react";


export default function Page() {
    const [isAdmin, setIsAdmin] = useState(false); // hook to store the state of the checkbox

    const handleCheckbox = () => {
        setIsAdmin(!isAdmin);

    };

  return (
    <>
      {/* This flex represents the whole page */}
      <Flex
        direction="row"
        backgroundColor="teal.50"
        height="100vh"
        width="100vw"
      >
        <Flex direction="row" height="100%" width="100%">
          {/* This flex represents the left side of the page  and it stores the logo*/}
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
              width="90%"
              borderRadius="30"
              justifyContent="start"
              alignItems="center"
              gap="2em"
              paddingTop="25%"
            >
              <Logo h={200} w={200} />
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
                <Checkbox onChange={handleCheckbox} mx="5%" w="100%" justifyContent="center" size="lg">
                  <Heading
                    color="teal.900"
                    size="md"
                    textAlign="center"
                    fontWeight="light"
                  >
                    ¿Iniciar sesión como administrador?
                  </Heading>
                </Checkbox>
              </Flex>
            </Flex>
          </Flex>

          {/* This flex represents the right side of the page  and it stores the form*/}
          <Flex direction="column" height="100%" width="50%"></Flex>
        </Flex>
      </Flex>
    </>
  );
}
