import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useSignupStore } from "@/store/useSignup";

export function useAccountInformation() {
  const { updateEmail, updatePassword } = useSignupStore();
  const toast = useToast();
  const router = useRouter();
  console.log("ando en el servidor");
  const handleAccountInformation: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      try {
        updateEmail(data.email);
        updatePassword(data.password);
        // at this point, we have collected all the data we need
        // to create an account
        // we can now proceed to the next step
        // toast que avise que se validar[an sus datos y se creará la cuenta]
        toast({
            title: 'Validación en progreso',
            description: 'Estamos validando tus datos y creando tu cuenta',
            status: 'info',
        })
        

      } catch (e) {
        toast({
          title: "Error",
          description: "Ocurrió un error al procesar la información",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        router.refresh()
      }
    },
    []
  );

  return handleAccountInformation;
}