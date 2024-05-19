// /src/hooks/useLogin.ts
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { login } from '@/actions/auth';
import { PrefixRoutes } from '@/types'; // Adjust the import according to your project structure

type useLoginProps = {
    isAdmin: boolean;
    setIsInvalid: (value: boolean) => void;

}
export const useLogin = ({isAdmin, setIsInvalid}: useLoginProps) => {
  const toast = useToast();
  const router = useRouter();

  const handleLogin: SubmitHandler<FieldValues> = useCallback(async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    console.log('formData', formData)
    const { error, body } = await login(formData, isAdmin ? 'admin' : 'cashier');
    const { title, description, notificationStatus } = body.message;
    toast({
      title,
      description,
      status: notificationStatus,
      isClosable: true,
    });
    if (!error) {
      router.push(isAdmin ? `${PrefixRoutes.ADMIN}/dashboard` : `${PrefixRoutes.CASHIER}/dashboard`);
    }
    setIsInvalid(true);
  }, [isAdmin, router, setIsInvalid, toast]);

  return handleLogin;
};
