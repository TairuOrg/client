import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useSignupStore } from "@/store/useSignup";
import { useActiveStepsStore } from "./useActiveSteps";

export const usePersonalInformation = () => {
  const toast = useToast();
  const { updateActiveSteps } = useActiveStepsStore();
  const {
    name,
    updateName,
    updatePersonalId,
    updateResidenceLocation,
    updatePhoneNumber,
  } = useSignupStore();
  const handleSignUp: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      try {
        updateName(data.fullname);
        updatePersonalId(`${data.idType}${data.identification}`);
        updateResidenceLocation(data.state);
        updatePhoneNumber(`${data.phoneCode}${data.phoneNumber}`);

        toast({
          title: "Información guardada",
          description: `Tu información personal ${name} ha sido almacenada satisfactoriamente.`,
          status: "success",
          isClosable: true,
        });
        updateActiveSteps()
      } catch (error) {
        console.error("Ha ocurrido un error", error);
        toast({
          title: "Ha ocurrido un error",
          description: "Por favor, intenta de nuevo.",
          status: "error",
          isClosable: true,
        });
      }
    },
    [toast]
  );

  return handleSignUp;
};
