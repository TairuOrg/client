import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { signUpCode } from "@/actions/auth";
import { useActiveStepsStore } from "./useActiveSteps";

export const useSignupCodeValidation = () => {
  const toast = useToast();
  const { updateActiveSteps } = useActiveStepsStore();
  const handleSignUp: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append("code", data.code);

      try {
        const { error, body } = await signUpCode(formData);

        const { title, description, notificationStatus } = body.message;
        toast({
          title,
          description,
          status: notificationStatus,
          isClosable: true,
        });
        
        if (!error) {
          updateActiveSteps();
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        toast({
          title: "Error",
          description: "An error occurred during the sign-up process.",
          status: "error",
          isClosable: true,
        });
      }
    },
    [toast]
  );

  return handleSignUp;
};
