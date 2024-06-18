"use client";
import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInformationSchema,
  PersonalInformationSchema,
} from "@/schemas/personalInformation";
import { usePersonalInformation } from "@/hooks/usePersonalInformation";

export default function PersonalInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInformationSchema>({
    resolver: zodResolver(personalInformationSchema),
    mode: "onChange",
    shouldFocusError: true,
    delayError: 5,
  });

  const handlePersonalInformation = usePersonalInformation();

  return (
    <>
      <div className="flex flex-row justify-center">
        <AiOutlineUser className="text-teal-50 text-9xl" />
        <span className="flex flex-col justify-center content-center">
          <h2 className="text-[40px] text-teal-50">Información</h2>
          <h2 className="text-[15px] text-teal-50 mx-auto">PERSONAL</h2>
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handlePersonalInformation)}
        className="flex w-full"
      >
        <FormControl className="flex flex-col justify-center items-center gap-4 w-full">
          <div className="flex flex-row justify-evenly w-full px-[40px]">
            <span>
              <div>
                <FormLabel className="text-teal-50">Nombre completo</FormLabel>
                <Input
                  isInvalid={!!errors.fullname}
                  {...register("fullname")}
                  w="200px"
                  borderColor="teal.800"
                  size="lg"
                  textColor="teal.800"
                  placeholder="John Doe"
                  type="text"
                  bg="teal.50"
                />
              </div>
              {errors.fullname && (
                <span className="text-red-500"> {errors.fullname.message}</span>
              )}
            </span>

            <span>
              <FormLabel className="text-teal-50">
                Cédula de identidad
              </FormLabel>
              <InputGroup size="lg" display="flex">
                <InputLeftAddon>
                  <Select {...register("idType")} width="fit-content">
                    <option value="V">V</option>
                    <option value="E">E</option>
                  </Select>
                </InputLeftAddon>
                <Input
                  isInvalid={!!errors.identification}
                  {...register("identification")}
                  w="100%"
                  borderColor="teal.800"
                  size="lg"
                  textColor="teal.800"
                  placeholder="12345678"
                  type="text"
                  bg="teal.50"
                />
              </InputGroup>
              {errors.identification && (
                <span className="text-red-500">
                  {errors.identification.message}
                </span>
              )}
            </span>
          </div>
          <div className="flex flex-row justify-evenly w-full px-[40px]">
            <span>
              <div>
              <FormLabel className="text-teal-50">Residencia</FormLabel>
              <Select
                isInvalid={!!errors.state}
                {...register("state")}
                variant="filled"
                placeholder="Estado"
                w="200px"
                size="lg"
              >
                <option value="amazonas">Amazonas</option>
              </Select>
              </div>
              {errors.state && <span className="text-red-500"> {errors.state.message}</span>}
            </span>
            <span>
              <FormLabel className="text-teal-50">Número de teléfono</FormLabel>
              <InputGroup size="lg" display="flex">
                <InputLeftAddon>
                  <Select {...register("phoneCode")} width="fit-content">
                    <option value="412">412</option>
                    <option value="416">416</option>
                    <option value="426">426</option>
                    <option value="414">414</option>
                    <option value="424">424</option>
                  </Select>
                </InputLeftAddon>
                <Input
                  isInvalid={!!errors.phoneNumber}
                  {...register("phoneNumber")}
                  w="100%"
                  borderColor="teal.800"
                  textColor="teal.800"
                  placeholder="1234567"
                  type="tel"
                  bg="teal.50"
                />
              </InputGroup>
              {errors.phoneNumber && <span className="text-red-500"> {errors.phoneNumber.message}</span>}
            </span>
          </div>
          <Button isDisabled={Boolean(Object.keys(errors).length)}type="submit" mt="20px">
            Siguiente
          </Button>
        </FormControl>
      </form>
    </>
  );
}
