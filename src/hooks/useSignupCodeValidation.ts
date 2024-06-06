import { useRouter } from 'next/navigation';
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { signUpCode } from "@/actions/auth";
import { useActiveStepsStore } from "./useActiveSteps";
type useSignupCodeValidationProps = {
  setIsInvalid: (value: boolean) => void;
  isInvalid: boolean;
};

export const useSignupCodeValidation = ({
  setIsInvalid,
  isInvalid,
}: useSignupCodeValidationProps) => {
    const router = useRouter();
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
        updateActiveSteps();
        router.replace('?step=2')
        if (error) {
          setIsInvalid(!isInvalid);
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        toast({
          title: "Error",
          description: "An error occurred during the sign-up process.",
          status: "error",
          isClosable: true,
        });
        setIsInvalid(true);
      }
    },
    [toast, setIsInvalid, isInvalid]
  );

  return handleSignUp;
};
