"use client";
import { PrefixRoutes } from "@/types";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ResetPassword from "./ResetPassword";
import { login } from "@/actions/auth";

export default function LoginForm({ isAdmin }: { isAdmin: boolean }) {
  const toast = useToast();
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ResetPassword isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Flex direction="column" height="100%" width="50%" alignItems="center">
        <VStack direction="column" width="100%" height="100%" marginTop="20%">
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

          <FormControl isRequired isInvalid={isInvalid}>
            <form
              action={async (formData: FormData) => {
                console.log("before the function login");
                const { error, body } = await login(
                  formData,
                  isAdmin ? "admin" : "cashier"
                );
                console.log("after the function login");
                const { title, description, notificationStatus } = body.message;
                const { userId } = body;
                toast({
                  title,
                  description,
                  status: notificationStatus,
                  isClosable: true,
                });
                !error &&
                  (isAdmin
                    ? router.push(`${PrefixRoutes.ADMIN}/dashboard`)
                    : router.push(`${PrefixRoutes.CASHIER}/dashboard`));
                setIsInvalid(true);
              }}
            >
              <Stack direction="column" mx="10%" spacing="4" h="100%">
                <FormLabel fontSize="2xl">Correo Eléctronico</FormLabel>
                <Input
                  name="email"
                  borderColor="teal.900"
                  size="lg"
                  placeholder="example@email.com"
                  type="email"
                />

                <FormLabel fontSize="2xl">Contraseña</FormLabel>
                <Input
                  name="password"
                  id="password"
                  borderColor="teal.900"
                  size="lg"
                  placeholder="*********"
                  type="password"
                />

                {isAdmin && (
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
    </>
  );
}
