import { FormLabel, FormControl, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function Step1({
  activeStep,
  setActiveStep,
}: {
  activeStep: number[];
  setActiveStep: (value: number[]) => void;
}) {
  const [code, setCode] = useState("");
  const handleCode = (data: FormData) => {
    console.log(data.get("code"));
    if (code === "1234-56") {
      setActiveStep([...activeStep, activeStep.push(activeStep[activeStep.length -1] + 1)]);
    }
  };
  return (
    <div>
      <div className="flex flex-row">
        <AiOutlineUser className="text-teal-50 text-9xl" />
        <span className="flex flex-col justify-center content-center">
          <h1 className={`text-[40px] text-teal-50 r`}>Registro</h1>
          <h2 className={` text-[15px] text-teal-50 mx-auto`}>
            De administrador
          </h2>
        </span>
      </div>
      <form action={handleCode} className="flex flex-col gap-2">
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
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            type="submit"
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
  );
}
