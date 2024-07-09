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
    isInvalid: boolean;

}
export const useLogin = ({isAdmin, setIsInvalid, isInvalid}: useLoginProps) => {
  const toast = useToast();
  const router = useRouter();
  console.log('soy o no admin', isAdmin)
  const handleLogin: SubmitHandler<FieldValues> = useCallback(async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    const { error, body } = await login(formData, isAdmin ? 'admin' : 'cashier');
    const { title, description, notificationStatus } = body.message;
    toast({
      title,
      description,
      status: notificationStatus,
      isClosable: true,
    });
    console.log('paso algo?:', error, body)
    if (!error) {
      
      router.push(isAdmin ? `${PrefixRoutes.ADMIN}/dashboard` : `${PrefixRoutes.CASHIER}/dashboard`);
    }
    setIsInvalid(!isInvalid);
  }, [isAdmin, router, setIsInvalid, toast]);

  return handleLogin;
};
