import {
  FormLabel,
  FormControl,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

import { AiOutlineUser } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupCodeSchema, SignupCodeSchema } from "@/schemas/signupCodeSchema";
import { useSignupCodeValidation } from "@/hooks/useSignupCodeValidation";

export default function VerificationCode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupCodeSchema>({
    resolver: zodResolver(signupCodeSchema),
    mode: "onChange",
    shouldFocusError: true,
    delayError: 5,
  });
  const handleCode = useSignupCodeValidation();
  return (
    <div>
      <div className="flex flex-row">
        <AiOutlineUser className="text-teal-50 text-9xl" />
        <span className="flex flex-col justify-center content-center">
          <h2 className="text-[40px] text-teal-50">Registro</h2>
          <h2 className="text-[15px] text-teal-50 mx-auto">De administrador</h2>
        </span>
      </div>
      <form onSubmit={handleSubmit(handleCode)} className="flex flex-col gap-2">
        <FormLabel className="text-teal-50">Ingrese el código</FormLabel>
        <FormControl
          isInvalid={!!errors.code}
          className="flex flex-col flex-wrap justify-center gap-4"
        >
          <Input
            {...register("code")}
            name="code"
            borderColor="teal.800"
            size="lg"
            textColor={"teal.800"}
            placeholder="XXXX-XX"
            type="password"
            bg={"teal.50"}
          />
          {errors.code && (
            <FormErrorMessage> {errors.code.message}</FormErrorMessage>
          )}
          <Button
            isDisabled={(!!errors.code)}
            type="submit"
            className="text-teal-50"
            bg="teal.50"
            mx="auto"
            w={"fit-content"}
          >
            Verificar
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
