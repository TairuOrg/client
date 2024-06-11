import { AiOutlineUser } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLabel, Input, FormControl, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AccountSchema, accountSchema } from "@/schemas/accountSchema";
import { useAccountInformation } from "@/hooks/useAccountInformation";

export default function AccountInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
    shouldFocusError: true,
    delayError: 5,
  });
  const handleAccountInformation = useAccountInformation();
  return (
    <>
      <div className="flex flex-row justify-center">
        <AiOutlineUser className="text-teal-50 text-9xl" />
        <span className="flex flex-col justify-center content-center">
          <h2 className="text-[40px] text-teal-50">Información</h2>
          <h2 className="text-[15px] text-teal-50 mx-auto">DE SU CUENTA</h2>
        </span>
      </div>
      <form onSubmit={handleSubmit(handleAccountInformation)}>
        <FormControl className="flex flex-col gap-2 w-full">
          <FormLabel className="text-teal-50">
            Ingrese su correo electrónico
          </FormLabel>
          <Input
            {...register("email")}
            borderColor="teal.800"
            size="lg"
            textColor="teal.800"
            placeholder="John Doe"
            type="text"
            bg="teal.50"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <FormLabel className="text-teal-50">Ingrese su contraseña</FormLabel>
          <Input
            className="bg-teal-50"
            variant="filled"
            {...register("password")}
            type="password"
            placeholder="Contraseña"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <FormLabel className="text-teal-50">Confirme su contraseña</FormLabel>
          <Input
            className="bg-teal-50"
            variant="filled"
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirme su contraseña"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
          <Button
            mt="5px"
            isDisabled={Boolean(Object.keys(errors).length)}
            type="submit"
          >
            Siguiente
          </Button>
        </FormControl>
      </form>
    </>
  );
}
