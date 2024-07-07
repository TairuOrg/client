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
import { settings } from "@/actions/settings";
import {
  updateInformation,
  UpdateInformation,
} from "@/schemas/updateInfomation";

export default function Page() {
  const [cashier, setCashier] = useState<User>();
  const [isCashierLoaded, setIsCashierLoaded] = useState(false);
  const [isCustomerNotFound, setIsCustomerNotFound] = useState(false);
  const [CustomerPersonalID, setCustomerPersonalID] = useState<string>("");

  const [userInfo, setUserInfo] = useState<User & { phoneCode: string }>(
    {} as User & { phoneCode: string }
  );

  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit: handleSubmitOpenSettings,
    formState: { errors },
  } = useForm<UpdateInformation>({
    resolver: zodResolver(updateInformation),
  });

  

  const handleSubmitEditProfile = (data: UpdateInformation) => {
    const response = settings({ ...data, personal_id: userInfo.personal_id });

    response.then(({ body: { message } }) => {
      toast({
        title: message.title,
        description: message.description,
        status: message.notificationStatus,
        duration: 9000,
        isClosable: true,
      });
      router.replace("/login")
    });
  };

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

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
    retrieveUserInfo("cashier").then((d) => {
      setCashier(d);
      setIsCashierLoaded(true);
      setUserInfo({
        ...d,
        phoneCode: d.phone_number.slice(3, 6),
        phone_number: d.phone_number.slice(6),
      });
    }).catch(error => {
      console.error("Error al obtener la información del cajero:", error);
    });
  }, []);

  

  const {
    isOpen: isOpenModalCustomer,
    onOpen: onOpenModalCustomer,
    onClose: onCloseModalCustomer,
  } = useDisclosure();

  const closeModalCustomer = () => {
    resetCustomer();
    onCloseModalCustomer();
  };

  const handleCreateModal = () => {
    onOpenModalCustomer();
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
      // Once the user is created, redirect to a view where the cashier can see the sales
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
    const id_to_search = `${customer_id.id_type}${customer_id.personal_id}`;
    searchCustomerByPersonalID(id_to_search).then((d) => {
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
      {console.log("Renderizando con cashier:", userInfo)}
      <Modal isOpen={isOpenSettings} onClose={onCloseSettings}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Editar Perfil</ModalHeader>
          <ModalBody>
            <div>
              <form
                onSubmit={handleSubmitOpenSettings(
                  handleSubmitEditProfile,
                  (data: any) => {
                    console.log(data);
                  }
                )}
              >
                <FormControl className="flex flex-col">
                  <FormLabel>Nombre:</FormLabel>
                  <Input
                    type="text"
                    {...register("fullname")}
                    defaultValue={userInfo.name}
                  />
                  {errors.fullname && (
                    <span className="text-red-500">
                      {" "}
                      {errors.fullname.message}{" "}
                    </span>
                  )}
                  <FormLabel>Cédula</FormLabel>
                  <Input
                    type="text"
                    isDisabled={true}
                    {...register("personal_id", {
                      setValueAs: (v: any) => userInfo.personal_id,
                    })}
                    value={userInfo.personal_id}
                  />

                  <FormLabel>Correo Electrónico:</FormLabel>
                  <Input
                    type="text"
                    {...register("email")}
                    defaultValue={userInfo.email}
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      {" "}
                      {errors.email.message}{" "}
                    </span>
                  )}
                  <FormLabel htmlFor="numero-telefonico">
                    Número Telefónico:
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>
                      <Select
                        {...register("phoneCode")}
                        defaultValue={userInfo.phoneCode}
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
                      {...register("phoneNumber")}
                      defaultValue={userInfo.phone_number}
                    />
                  </InputGroup>
                  {errors.phoneNumber && (
                    <span className="text-red-500">
                      {" "}
                      {errors.phoneNumber.message}{" "}
                    </span>
                  )}
                  <FormLabel>Residencia:</FormLabel>
                  <InputGroup>
                    <Select {...register("state")}>
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
                  </InputGroup>
                  {errors.state && (
                    <span className="text-red-500">
                      {" "}
                      {errors.state.message}{" "}
                    </span>
                  )}

                  <FormLabel>Contraseña:</FormLabel>
                  <Input type="password" {...register("password")} />
                  {errors.password && (
                    <span className="text-red-500">
                      {" "}
                      {errors.password.message}{" "}
                    </span>
                  )}
                  <FormLabel>Confirmar Contraseña:</FormLabel>
                  <Input type="password" {...register("confirmPassword")} />
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      {" "}
                      {errors.confirmPassword.message}{" "}
                    </span>
                  )}
                  <Button type="submit" marginTop="10px" colorScheme="green">
                    Actualizar
                  </Button>
                </FormControl>
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenModalCustomer} onClose={closeModalCustomer}>
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
                    placeholder="Ingrese la cédula del cliente"
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
                      placeholder="Ingrese la cédula del cliente"
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

            <ModalFooter>
              <div className="w-full flex justify-start">
                <Button colorScheme="red" onClick={closeModalCustomer}>
                  Cerrar ventana
                </Button>
              </div>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
      <main className="relative w-screen h-screen flex flex-col gap-4">
        <span className="mx-auto mt-5 w-fit text-center text-teal-800 text-4xl">
          Buenas tardes {isCashierLoaded ? cashier?.name : ""}
        </span>

        <section className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <span className="fixed top-20 w-fit py-2 px-5 text-4xl text-teal-800">
            {" "}
            Panel de cajero
          </span>

          <section className="flex gap-4 w-full justify-center">
            <div
              className=" bg-teal-300 h-[250px] w-[500px] rounded-xl shadow-lg border-2 text-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={(e) => handleCreateModal()}
            >
              <span className="flex w-full  h-full items-center justify-center text-3xl text-teal-800 gap-2">
                <FaCartPlus size={100} />
                Crear venta
              </span>
            </div>
            <div
              className="bg-teal-500 h-[250px] w-[300px] rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={onOpenSettings}
            >
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
