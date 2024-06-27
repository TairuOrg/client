"use client";
import { CiLogout } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Customer, User } from "@/types";
import { retrieveUserInfo } from "@/actions/retrieveUserInfo";
import { useRouter } from "next/navigation";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  useToast,
} from "@chakra-ui/react";
import {
  createCustomerSchema,
  CreateCustomer,
} from "@/schemas/cashier/customer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SearchCustomer,
  searchCustomerSchema,
} from "@/schemas/cashier/searchCustomer";
import {
  searchCustomerByPersonalID,
  createCustomer,
} from "@/actions/cashier/customers";

export default function Page() {
  const [cashier, setCashier] = useState<User>();
  const [isCashierLoaded, setIsCashierLoaded] = useState(false);

  const [isCustomerNotFound, setIsCustomerNotFound] = useState(false);
  const [CustomerPersonalID, setCustomerPersonalID] = useState<string>("");
  const [SalesCustomer, setSalesCustomer] = useState<Customer>(); // should remove this later

  const router = useRouter(); // Not being used yet
  const toast = useToast();
  const {
    register: registerCustomer,
    formState: { errors: errorsCustomer },
    handleSubmit: handleSubmitCustomer,
    reset: resetCustomer,
  } = useForm<CreateCustomer>({
    resolver: zodResolver(createCustomerSchema),
    mode: "onChange",
    delayError: 3000,
  });
  const {
    register: registerSearchCustomer,
    formState: { errors: errorsSearchCustomer },
    handleSubmit: handleSubmitSearchCustomer,
  } = useForm<SearchCustomer>({
    resolver: zodResolver(searchCustomerSchema),
    mode: "onChange",
    delayError: 3000,
  });

  useEffect(() => {
    console.log("holaa");
    retrieveUserInfo("cashier").then((d) => {
      console.log("mi data es:", d);

      setCashier(d);
    });
    setIsCashierLoaded(true);
  }, []);
  const {
    isOpen: isOpenModalSale,
    onOpen: onOpenModalSale,
    onClose: onCloseModalSale,
  } = useDisclosure();

  const closeModalSales = () => {
    resetCustomer();
    onCloseModalSale();
  };

  const handleCreateSale = () => {
    onOpenModalSale();
    console.log("crear venta");
  };

  const handleCreateCustomer = (customer: Customer) => {
    const customer_to_insert = {
      name: customer.name,
      personal_id: `${customer.id_type}${customer.personal_id}`,
      phone_number: `${customer.phone_code}${customer.phone_number}`,
      residence_location: customer.residence_location,
    };
    createCustomer(customer_to_insert).then((response) => {
      const {
        body: { payload },
      } = response;

      toast({
        title: "Cliente creado",
        status: "success",
      });
      router.push(
        `/cashier/sales?cashier_id=${encodeURIComponent(
          (cashier?.id as number).toString()
        )}&customer_personal_id=${payload.personal_id}`
      );
    });
  };
  const handleSearchCustomer = (customer_id: {
    id_type: string;
    personal_id: string;
  }) => {
    console.log("buscando cliente");
    const id_to_search = `${customer_id.id_type}${customer_id.personal_id}`
    searchCustomerByPersonalID(
      id_to_search
    ).then((d) => {
      const {
        error,
        body: { message },
      } = d;

      toast({
        title: message.title,
        description: message.description,
        status: message.notificationStatus,
      });

      if (error) {
        setIsCustomerNotFound(true);
        setCustomerPersonalID(customer_id.personal_id);
      } else {
        setIsCustomerNotFound(false);
        router.push(
          `/cashier/sales?cashier_id=${encodeURIComponent(
            (cashier?.id as number).toString()
          )}&customer_personal_id=${id_to_search}`
        );
      }
    });
  };


  return (
    <>
      <Modal isOpen={isOpenModalSale} onClose={closeModalSales}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-4">
            <form onSubmit={handleSubmitSearchCustomer(handleSearchCustomer)}>
              <FormControl className="flex flex-col gap-4">
                <FormLabel>
                  Ingrese la cédula del cliente para su búsqueda:{" "}
                </FormLabel>
                <InputGroup>
                  <InputLeftAddon>
                    <Select
                      width="fit-content"
                      {...registerSearchCustomer("id_type")}
                    >
                      <option value="V">V</option>
                      <option value="E">E</option>
                    </Select>
                  </InputLeftAddon>
                  <Input
                    type="text"
                    placeholder="Ingrese la cédula del cajero"
                    {...registerSearchCustomer("personal_id")}
                  />
                  {errorsSearchCustomer.personal_id && (
                    <span className="text-red-500">
                      {errorsSearchCustomer.personal_id.message}
                    </span>
                  )}
                </InputGroup>
                <Button type="submit">Buscar cliente</Button>
              </FormControl>
            </form>

            {isCustomerNotFound ? (
              <form onSubmit={handleSubmitCustomer(handleCreateCustomer)}>
                <FormControl className="flex flex-col gap-4">
                  <FormLabel>Documento de identidad del cliente:</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>
                      <Select
                        width="fit-content"
                        {...registerCustomer("id_type")}
                      >
                        <option value="V">V</option>
                        <option value="E">E</option>
                      </Select>
                    </InputLeftAddon>
                    <Input
                      type="text"
                      placeholder="Ingrese la cédula del cajero"
                      {...registerCustomer("personal_id")}
                      defaultValue={CustomerPersonalID}
                    />
                  </InputGroup>
                  {errorsCustomer.personal_id && (
                    <span className="text-red-500">
                      {errorsCustomer.personal_id.message}
                    </span>
                  )}
                  <FormLabel>Nombre del cliente:</FormLabel>
                  <Input
                    type="text"
                    placeholder="Ingrese el nombre del cliente"
                    {...registerCustomer("name")}
                  />
                  {errorsCustomer.name && (
                    <span className="text-red-500">
                      {errorsCustomer.name.message}
                    </span>
                  )}
                  <FormLabel>Número telefónico del cliente:</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>
                      <Select
                        width="fit-content"
                        {...registerCustomer("phone_code")}
                      >
                        <option value="412">412</option>
                        <option value="416">416</option>
                        <option value="426">426</option>
                        <option value="414">414</option>
                        <option value="424">424</option>
                      </Select>
                    </InputLeftAddon>
                    <Input
                      type="number"
                      placeholder="Ingrese el telefóno de contacto"
                      {...registerCustomer("phone_number")}
                    />
                  </InputGroup>
                  {errorsCustomer.phone_number && (
                    <span className="text-red-500">
                      {errorsCustomer.phone_number.message}
                    </span>
                  )}
                  <FormLabel>
                    Ingrese el lugar de residencia del cliente:
                  </FormLabel>
                  <Select
                    width="full"
                    placeholder="Seleccione el estado de residencia"
                    {...registerCustomer("residence_location")}
                  >
                    <option value="amazonas">Amazonas</option>
                    <option value="anzoategui">Anzoátegui</option>
                    <option value="apure">Apure</option>
                    <option value="aragua">Aragua</option>
                    <option value="barinas">Barinas</option>
                    <option value="bolivar">Bolívar</option>
                    <option value="carabobo">Carabobo</option>
                    <option value="cojedes">Cojedes</option>
                    <option value="delta_amacuro">Delta Amacuro</option>
                    <option value="distrito_capital">Distrito Capital</option>
                    <option value="falcon">Falcón</option>
                    <option value="guarico">Guárico</option>
                    <option value="lara">Lara</option>
                    <option value="merida">Mérida</option>
                    <option value="miranda">Miranda</option>
                    <option value="monagas">Monagas</option>
                    <option value="nueva_esparta">Nueva Esparta</option>
                    <option value="portuguesa">Portuguesa</option>
                    <option value="sucre">Sucre</option>
                    <option value="tachira">Táchira</option>
                    <option value="trujillo">Trujillo</option>
                    <option value="yaracuy">Yaracuy</option>
                    <option value="zulia">Zulia</option>
                  </Select>
                  {errorsCustomer.residence_location && (
                    <span className="text-red-500">
                      {errorsCustomer.residence_location.message}
                    </span>
                  )}
                  <Button type="submit">Crear cliente</Button>
                </FormControl>
              </form>
            ) : (
              ""
            )}

            <ModalFooter className="flex w-full justify-between">
              <div className="w-full flex justify-start">
                <Button colorScheme="red">Cancelar venta</Button>
              </div>
              <div className="w-full flex justify-end">
                <Button colorScheme="teal">Guardar venta</Button>
              </div>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
      <main className="w-screen h-screen flex flex-col gap-4">
        <section className="flex flex-col gap-10 justify-center items-center w-full h-fit mb-[20px] mt-10">
          <h1 className="text-3xl font-semibold text-teal-50 text-center">
            <span className="w-fit py-2 px-5 rounded-3xl bg-teal-500">
              Buenas tardes {isCashierLoaded ? cashier?.name : ""}
            </span>
          </h1>
        </section>
        <section className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <span className="flex text-teal-800 text-3xl justify-center items-center gap-4">
            <span className="w-fit py-2 px-5 rounded-2xl bg-teal-300 text-teal-800">
              {" "}
              Panel de administración
            </span>
          </span>
          <section className="flex gap-4 w-full justify-center">
            <div
              className=" bg-teal-300 h-[250px] w-[500px] rounded-xl shadow-lg border-2 text-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={(e) => handleCreateSale()}
            >
              <span className="flex w-full  h-full items-center justify-center text-3xl text-teal-800 gap-2">
                <FaCartPlus size={100} />
                Crear venta
              </span>
            </div>
            <div className="bg-teal-500 h-[250px] w-[300px] rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
              <span className="flex w-full flex-col h-full text-3xl text-teal-50 justify-center items-center">
                <IoSettingsSharp size={100} />
                Configuración
              </span>
            </div>
          </section>
          <section className="flex gap-4 w-full justify-center">
            <div className="bg-teal-500 h-[200px] w-[500px] rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
              <span className="flex w-full  h-full items-center justify-center text-3xl text-teal-50 gap-2">
                <TbReportMoney size={100} />
                Ventas creadas
              </span>
            </div>
            <div className="bg-teal-300 h-[200px] w-[300px] rounded-xl shadow-lg border-2 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
              <span className="flex w-full flex-col h-full text-3xl text-teal-800 justify-center items-center">
                <CiLogout size={100} />
                Cerrar sesión
              </span>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
