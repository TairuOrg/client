import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Step1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50">
      <div className="flex flex-col flex-wrap w-[670px] h-[500px] bg-teal-800 rounded-[20px] justify-center content-center gap-4">
        <div className="flex flex-row">
          <AiOutlineUser className="text-teal-50 text-9xl" />
          <span className="flex flex-col justify-center content-center">
            <h1 className={`text-[40px] text-teal-50 r`}>Registro</h1>
            <h2 className={` text-[15px] text-teal-50 mx-auto`}>
              De administrador
            </h2>
          </span>
        </div>

        <form action="" className="flex flex-col gap-2">
          <FormLabel className={` text-teal-50`}> Ingrese el código </FormLabel>
          <FormControl className="flex flex-col flex-wrap justify-center gap-4">
            <Input
              name="code"
              borderColor="teal.800"
              size="lg"
              textColor={"teal.800"}
              placeholder="XXXX-XX"
              type="text"
              bg={"teal.50"}
            />
            <Button
              className={`text-teal-50`}
              bg="teal.50"
              mx="auto"
              w={"fit-content"}
            >
              {" "}
              Verificar
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
}
