"use client";
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
          <h2 className={`text-[40px] text-teal-50 r`}>Información</h2>
          <h2 className={` text-[15px] text-teal-50 mx-auto`}>
            De administrador
          </h2>
        </span>
      </div>
      <form onSubmit={handleSubmit(handlePersonalInformation)} className="flex w-full">
        <FormControl className="flex flex-col flex-wrap justify-center items-center gap-4 w-full">
          <div className="flex flex-row justify-evenly w-full px-[40px]">
            <span>
              <FormLabel className="text-teal-50"> Nombre completo </FormLabel>
              <Input
                w="200px"
                name="name"
                borderColor="teal.800"
                size="lg"
                textColor={"teal.800"}
                placeholder="John Doe"
                type="text"
                bg={"teal.50"}
              />
            </span>
            <span>
              <FormLabel className="text-teal-50">
                Cédula de identidad
              </FormLabel>
              <InputGroup size={"lg"}>
                <InputLeftAddon>
                  <Select width={"fit-content"}>
                    <option value="V">V</option>
                    <option value="E">E</option>
                  </Select>
                </InputLeftAddon>
                <Input
                  {...register("identification")}
                  w="200px"
                  name="email"
                  borderColor="teal.800"
                  size="lg"
                  textColor={"teal.800"}
                  placeholder="V-12345678"
                  type="text"
                  bg={"teal.50"}
                />
              </InputGroup>
            </span>
          </div>
          <div className="flex flex-row justify-evenly w-full px-[40px]">
            <span>
              <FormLabel className="text-teal-50">Residencia</FormLabel>
              <Select
                variant={"filled"}
                placeholder="Estado"
                w="200px"
                size="lg"
              >
                <option value="amazonas"> Amazonas </option>
              </Select>
            </span>
            <span>
              <FormLabel className="text-teal-50">Número de teléfono</FormLabel>
              <InputGroup size="lg">
                <InputLeftAddon>
                  <Select width={"fit-content"}>
                    <option value="412">412</option>
                    <option value="416">416</option>
                    <option value="426">426</option>
                    <option value="414">414</option>
                    <option value="424">424</option>
                  </Select>
                </InputLeftAddon>
                <Input
                  w="180px"
                  name="phone"
                  borderColor="teal.800"
                  textColor={"teal.800"}
                  placeholder="412-1234567"
                  type="tel"
                  bg={"teal.50"}
                />
              </InputGroup>
            </span>
          </div>
          <Button type='submit' mt="20px">Siguiente</Button>
        </FormControl>
      </form>
    </>
  );
}
