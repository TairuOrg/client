"use client";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import ResetPassword from "./ResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useLogin";
import { loginSchema, LoginSchema } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";

export default function LoginForm({ isAdmin }: { isAdmin: boolean }) {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    shouldFocusError: true,
    delayError: 5,
  });
  const handleLogin = useLogin({ isAdmin, setIsInvalid, isInvalid });

  return (
    <>
      <ResetPassword isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Flex direction="column" height="100%" width="50%" alignItems="center">
        <VStack direction="column" width="100%" height="100%" marginTop="20%">
          <HStack justifyContent="center" marginBottom="10%" width="100%">
            <Heading color="teal.900" size="4xl">
              Iniciar sesión
            </Heading>
          </HStack>

          <form onSubmit={handleSubmit(handleLogin)} style={{ width: "100%" }}>
            <Stack direction="column" mx="5%" pr="10%" spacing="4" width="100%">
              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel fontSize="2xl">Correo Eléctronico</FormLabel>
                <Input
                  {...register("email")}
                  name="email"
                  borderColor="teal.900"
                  size="lg"
                  placeholder="example@email.com"
                  type="email"
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel fontSize="2xl">Contraseña</FormLabel>
                <Input
                  {...register("password")}
                  name="password"
                  id="password"
                  borderColor="teal.900"
                  size="lg"
                  placeholder="*********"
                  type="password"
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>

              {/* {isAdmin && (
                <HStack mt="4" justifyContent="flex-start" width="100%">
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
                    Olvidé mi contraseña
                  </Button>
                </HStack>
              )}*/}
              <HStack mt="2" justifyContent="center" width="100%">
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
        </VStack>
      </Flex>
    </>
  );
}
