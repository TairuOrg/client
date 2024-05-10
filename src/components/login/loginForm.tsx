"use client";
import { AuthData, AuthResponse, PrefixRoutes, FormData } from "@/types";
import prepareAuth from "@/utils/prepareAuth";
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

const LOGIN_URL = "/api/login" as const;

export default function LoginForm({ isAdmin }: { isAdmin: boolean }) {
  const toast = useToast();
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const updateEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: evt.target.value });
  };
  const updatePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: evt.target.value });
  };
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

          <FormControl
            onSubmit={async (evt: React.FormEvent<HTMLDivElement>) => {
              evt.preventDefault();
              // Hash the password
              const preparedFormData: FormData = prepareAuth(formData);
              // Send a post to the server and wait for its response, the server will validate the user credentials

              // Prepare the data to be sent to the server
              const authData: AuthData = {
                formData: preparedFormData,
                isAdmin,
              };

              const { error, body }: AuthResponse = await (
                await fetch(LOGIN_URL, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(authData),
                })
              ).json();
              const { title, description, notificationStatus } = body.message;

              toast({
                title,
                description,
                status: notificationStatus,
              });

              setIsInvalid(error);

              !error && // if no error occured, redirect to dashboard page depending on the user role
                (isAdmin
                  ? router.push(`${PrefixRoutes.ADMIN}/dashboard`)
                  : router.push(`${PrefixRoutes.CASHIER}/dashboard`));
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
