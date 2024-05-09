import { AuthData, AuthResponse, PrefixRoutes } from "@/types";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm({
  authData,
  updateEmail,
  updatePassword,
  onOpen,
}: {
  authData: AuthData;
  updateEmail: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  updatePassword: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onOpen: () => void;
}) {
  const toast = useToast();
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  return (
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
            const preparedAuthData = prepareAuth(authData);
            // Send a post to the server and wait for its response, the server will validate the user credentials
            const { error, body }: AuthResponse = await (
              await fetch("/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(preparedAuthData),
              })
            ).json();

            const { title, description, notificationStatus } = body.message;

            toast({
              title,
              description,
              status: notificationStatus,
            });

            setIsInvalid(error);

            if (!error) {
              authData.isAdmin
                ? router.push(`${PrefixRoutes.ADMIN}/dashboard`)
                : router.push(`${PrefixRoutes.CASHIER}/dashboard`);
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
  );
}
