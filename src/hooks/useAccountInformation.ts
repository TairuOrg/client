import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';


export function useAccountInformation() {
    const toast = useToast();
    const router = useRouter();
    console.log('ando en el servidor')
    const handleAccountInformation: SubmitHandler<FieldValues> = useCallback(async (data) => {
        console.log(data);
    }, []);

    return handleAccountInformation;

}