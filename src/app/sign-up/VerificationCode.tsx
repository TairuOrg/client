import { FormLabel, FormControl, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
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

  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const handleCode = useSignupCodeValidation({ setIsInvalid, isInvalid });

  return (
    <div>
      <div className="flex flex-row">
        <AiOutlineUser className="text-teal-50 text-9xl" />
        <span className="flex flex-col justify-center content-center">
          <h1 className="text-[40px] text-teal-50">Registro</h1>
          <h2 className="text-[15px] text-teal-50 mx-auto">De administrador</h2>
        </span>
      </div>
      <form onSubmit={handleSubmit(handleCode)} className="flex flex-col gap-2">
        <FormLabel className="text-teal-50">Ingrese el código</FormLabel>
        <FormControl className="flex flex-col flex-wrap justify-center gap-4">
          <Input
            {...register("code")}
            name="code"
            borderColor="teal.800"
            size="lg"
            textColor={"teal.800"}
            placeholder="XXXX-XX"
            type="text"
            bg={"teal.50"}
          />
          <Button
            type="submit"
            className="text-teal-50"
            bg="teal.50"
            mx="auto"
            w={"fit-content"}
          >
            Verificar
          </Button>
        </FormControl>
        {errors.code && <span className="text-red-500">{errors.code.message}</span>}
      </form>
    </div>
  );
}
