'use client'
import { Input, FormControl, FormLabel, Select } from "@chakra-ui/react";

export default function PersonalInformation() {
  return (
    <form className="flex gap-2">
      <FormControl className="flex flex-col flex-wrap justify-center items-center gap-4">
        <div className="flex flex-row justify-center">
          <span>
            <FormLabel className="text-teal-50"> Nombre completo </FormLabel>
            <Input
              width="80%"
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
            <FormLabel className="text-teal-50">Cédula de identidad</FormLabel>
            <Input
              width="80%"
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
        <div className="flex justify-center">
          <span>
            <FormLabel>Residencia</FormLabel>
            <Select variant={'filled'} placeholder="Estado">
                // 
            </Select>
          </span>
        </div>
      </FormControl>
    </form>
  );
}
