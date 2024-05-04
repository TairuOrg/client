"use client";
import {
  Flex,
  Heading,
  Spacer,
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  VStack,
  HStack,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import Logo from "@/assets/Logo";
import { useState } from "react";
import { AuthData } from "@/lib/data";
import { login } from "@/services/auth";
import ResetPassword from "@/components/login/ResetPassword";
import { useRouter } from "next/navigation";
export default function Page() {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthData>({
    isAdmin: false,
    email: "",
    password: "",
  });

  const handleCheckbox = () => {
    setAuthData({ ...authData, isAdmin: !authData.isAdmin });
  };

  const updateEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, email: evt.target.value });
  };
  const updatePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, password: evt.target.value });
  };

  return (
    <>
      <ResetPassword isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
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
                <Checkbox
                  onChange={handleCheckbox}
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

          {/* This flex represents the right side of the page  and it stores the form*/}
          <Flex
            direction="column"
            height="100%"
            width="50%"
            alignItems="center"
          >
            <VStack
              direction="column"
              width="100%"
              height="100%"
              marginTop="20%"
            >
              <HStack
                direction="row"
                justifyContent="center"
                marginBottom="10%"
                width="100%"
              >
                <Heading color="teal.900" size="4xl">
                  Iniciar sesión
                </Heading>
              </HStack>

              <FormControl
                onSubmit={(evt: React.FormEvent<HTMLDivElement>) => {
                  evt.preventDefault();
                  const { isError, title, description, notificationStatus } =
                    login(authData);
                  toast({
                    title,
                    description,
                    status: notificationStatus,
                  });
                  
                  setIsInvalid(isError);
                  if(!isError) {
                    router.push('/dashboard')
                  }

                }}
                isRequired
                isInvalid={isInvalid}
              >
                <form>
                  <Stack direction="column" mx="10%" spacing="4" h="100%">
                    <FormLabel fontSize="2xl">Correo Eléctronico</FormLabel>
                    <Input
                      id="email"
                      borderColor="teal.900"
                      size="lg"
                      placeholder="example@email.com"
                      type="email"
                      onChange={(evt) => updateEmail(evt)}
                    />

                    <FormLabel fontSize="2xl">Contraseña</FormLabel>
                    <Input
                      id="password"
                      borderColor="teal.900"
                      size="lg"
                      placeholder="*********"
                      type="password"
                      onChange={(evt) => updatePassword(evt)}
                    />

                    {authData.isAdmin && (
                      <HStack mt="4" justifyContent="flex-start">
                        <Button
                          onClick={onOpen}
                          size="sm"
                          height="30"
                          bg="teal.100"
                          variant="solid"
                          fontSize="lm"
                          _hover={{
                            color: "teal.50",
                            variant: "solid",
                            bg: "teal.900",
                          }}
                        >
                          Olvidé mi contraseña{" "}
                        </Button>
                      </HStack>
                    )}
                    <HStack mt="2" justifyContent="center">
                      <Button
                        type="submit"
                        size="lg"
                        height="50"
                        bg="teal.100"
                        variant="solid"
                        fontSize="2xl"
                        _hover={{
                          color: "teal.50",
                          variant: "solid",
                          bg: "teal.900",
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                    </HStack>
                  </Stack>
                </form>
              </FormControl>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
