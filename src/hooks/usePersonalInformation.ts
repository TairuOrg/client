import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";


export const usePersonalInformation = () => {
    const toast = useToast();
    console.log('sdadad')
    const handlePersonalInformation: SubmitHandler<FieldValues> = useCallback(
        async (data) => {
            console.log(data, 'dsdasda')
        },
        [toast]
    )
    return handlePersonalInformation;
}