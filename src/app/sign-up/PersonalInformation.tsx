'use client'
import {
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function PersonalInformation() {
  return (
    <>
      <div className="flex flex-row justify-center">
        <AiOutlineUser className="text-teal-50 text-9xl" />
        <span className="flex flex-col justify-center content-center">
          <h1 className={`text-[40px] text-teal-50 r`}>Información</h1>
          <h2 className={` text-[15px] text-teal-50 mx-auto`}>
            De administrador
          </h2>
        </span>
      </div>
      <form className="flex w-full">
        <FormControl className="flex flex-col flex-wrap justify-center items-center gap-4 w-full">
          <div className="flex flex-row justify-evenly w-full">
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
              <Input
                w="200px"
                name="email"
                borderColor="teal.800"
                size="lg"
                textColor={"teal.800"}
                placeholder="V-12345678"
                type="text"
                bg={"teal.50"}
              />
            </span>
          </div>
          <div className="flex flex-row justify-evenly w-full ">
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
              <Input
                w="200px"
                name="phone"
                borderColor="teal.800"
                size="lg"
                textColor={"teal.800"}
                placeholder="0412-1234567"
                type="text"
                bg={"teal.50"}
              />
            </span>
          </div>
          <Button mt="20px">Siguiente</Button>
        </FormControl>
      </form>
    </>
  );
}
