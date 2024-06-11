import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useSignupStore } from "@/store/useSignup";
import { validateData, signUp } from "@/actions/auth";

export function useAccountInformation() {
  const {
    updateEmail,
    updatePassword,
    email,
    password,
    name,
    personal_id,
    phone_number,
    residence_location,
  } = useSignupStore();
  const toast = useToast();
  const router = useRouter();

  const handleAccountInformation: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      try {
        updateEmail(data.email);
        updatePassword(data.password);
        // at this point, we have collected all the data we need
        // to create an account
        // we can now proceed to the next step
        // toast que avise que se validarán sus datos y se creará la cuenta
        toast({
          title: "Validación en progreso",
          description: "Estamos validando tus datos y creando tu cuenta",
          status: "info",
        });
        const { body, error } = await validateData({
          email,
          password,
          name,
          personal_id,
          phone_number,
          residence_location,
        });

        toast({
          title: body.message.title,
          description: body.message.description,
          status: body.message.notificationStatus,
          isClosable: true,
        });
        if (!error) {
          const { body, error } = await signUp({
            email,
            password,
            name,
            personal_id,
            phone_number,
            residence_location,
          });
          toast({
            title: body.message.title,
            description: body.message.description,
            status: body.message.notificationStatus,
            isClosable: true,
          });
        }
      } catch (e) {
        toast({
          title: "Error",
          description: "Ocurrió un error al procesar la información",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        router.refresh();
      }
    },
    []
  );

  return handleAccountInformation;
}