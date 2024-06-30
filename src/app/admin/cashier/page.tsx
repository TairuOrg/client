"use client";
import { useEffect, useState, FormEvent, useRef, MouseEvent } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  Button,
  ModalFooter,
  useToast,
  Badge,
  useDisclosure,
  FormControl,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { cashiersInfo, createCashier } from "@/actions/cashier";
import { Cashier } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cashierSchema, CashierSchema } from "@/schemas/cashierSchema";
import { deleteCashier } from "@/actions/manageCashier";
import { create } from "domain";

enum FilterOptions {
  NAME = "name",
  ID = "id",
  PERSONAL_ID = "personal_id",
}
export default function CashierPage() {
  const {
    isOpen: isOpenModalFilter,
    onOpen: onOpenModalFilter,
    onClose: onCloseModalFilter,
  } = useDisclosure();
  const {
    isOpen: isOpenRegisterCashier,
    onClose: onCloseRegisterCashier,
    onOpen: onOpenRegisterCashier,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteCashier,
    onClose: onCloseDeleteCashier,
    onOpen: onOpenDeleteCashier,
  } = useDisclosure();

  const toast = useToast();
  const [data, setData] = useState<Cashier[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>(FilterOptions.NAME);
  const [selectedCashier, setSelectedCashier] = useState<
    [Cashier, number] | null
  >(null);
  const [reloadFromServer, setReloadFromServer] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const cancelRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CashierSchema>({
    resolver: zodResolver(cashierSchema),
    mode: "onChange",
    shouldFocusError: true,
    delayError: 5,
  });

  const handleSubmitValid = (cashier: {
    name: string;
    id_type: string;
    personal_id: string;
    phone_code: string;
    phone_number: string;
    email: string;
    password: string;
    confirmPassword: string;
    state: string;
  }) => {
    const cashier_to_insert = {
      name: cashier.name,
      personal_id: `${cashier.id_type}${cashier.personal_id}`,
      phone_number: `${cashier.phone_code}${cashier.phone_number}`,
      email: cashier.email,
      password: cashier.password,
      residence_location: cashier.state,
      role: 'cashier'
    }
    createCashier(cashier_to_insert); 
    toast({
      title: "Cajero registrado",
      description: "El cajero ha sido registrado con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const onSubmitFn = (e: FormEvent<HTMLFormElement>) => {
    console.log("se ejecutaaa");
    e.preventDefault();
    handleSubmit(handleSubmitValid)();
  };

  const handleFilterPreferences = () => {
    onCloseModalFilter();
    toast({
      title: "Preferencia guardada",
      description: "Se ha guardado la preferencia de filtro",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleDeleteCashierBtn = async (_e: any) => {
    try {
      await deleteCashier(selectedCashier?.[0].User.personal_id as string);
      onCloseDeleteCashier();
      toast({
        title: "Se ha eliminado correctamente el cajero",
        status: "info",
      });
    } catch (e) {
      toast({
        title: "Ocurrió un error a la hora de eliminar el cajero",
        status: "error",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          body: { payload },
        } = await cashiersInfo();
        const newPayload = payload.map((cashier: Cashier) => {
          const { User } = cashier;
          return {
            User,
            is_online: cashier.is_online,
            rendered_is_online: (
              <Badge
                size="lg"
                colorScheme={cashier.is_online ? "green" : "yellow"}
              >
                {cashier.is_online ? "Activo" : "Inactivo"}
              </Badge>
            ),
            btnAction: (
              <Button
                colorScheme="red"
                variant={"outline"}
                onClick={onOpenDeleteCashier}
                isDisabled={cashier.User.is_deleted}
              >
                {cashier.User.is_deleted ? "Eliminado" : "Eliminar"}
              </Button>
            ),
          };
        });

        setData(newPayload);
      } catch (error) {
        toast({
          title: "Error en la conexión",
          description: "No se pudo conectar al servidor",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchData();
    setReloadFromServer(false);
  }, [reloadFromServer]);

  useEffect(() => {
    if (filterValue === "") {
      setReloadFromServer(true);
      return setData(data);
    }

    switch (filterOption) {
      case FilterOptions.NAME:
        setData(
          data.filter((cashier) =>
            cashier.User.name.toLowerCase().includes(filterValue)
          )
        );
        break;

      case FilterOptions.PERSONAL_ID:
        setData(
          data.filter((cashier) =>
            cashier.User.personal_id.includes(filterValue)
          )
        );
        break;

      default:
        throw new Error("Malformed filter option");
    }
  }, [filterValue, search]);

  const col = [
    {
      header: "Cédula",
      id: "cashier_personal_id",
    },
    {
      header: "Nombre del cajero",
      id: "cashiers_name",
    },
    {
      header: "Estado del cajero",
      id: "cashier_status",
    },
    {
      header: "Número Telefónico",
      id: "cashier_phone",
    },
    {
      header: "Acciones",
      id: "cashier_accions",
    },
  ];

  const handleFilterButtonClick = () => {
    onOpenModalFilter();
  };

  return (
    <div className="flex flex-col justify-items items-center w-full p-[100px] gap-4">
      <form className="flex flex-row gap-4">
        <input
          type="text"
          className="w-[600px] px-2 rounded-lg h-[50px]"
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder={
            filterOption === FilterOptions.NAME
              ? "Buscar cajero por su nombre"
              : filterOption === FilterOptions.PERSONAL_ID
              ? "Buscar cajero por su cédula"
              : "Buscar cajero por su ID"
          }
        />
        <button
          type="button"
          onClick={(e) => setSearch(!search)}
          className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white"
        >
          <MdOutlineSearch size="30" />
        </button>

        <button
          type="button"
          onClick={handleFilterButtonClick}
          className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white"
        >
          <CiFilter size="30" />
        </button>

        <button
          onClick={onOpenRegisterCashier}
          type="button"
          className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white"
        >
          <FaUserPlus size="30" />
        </button>
      </form>

      <section className="border-teal-700 border-[2px] p-4 rounded-lg w-full h-fit">
        <AlertDialog
          isOpen={isOpenDeleteCashier}
          onClose={onCloseDeleteCashier}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Eliminar Cajero</AlertDialogHeader>
              <AlertDialogBody>
                ¿Está seguro que desea eliminar este cajero?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseDeleteCashier}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={(e) => handleDeleteCashierBtn(e)}
                  ml={3}
                >
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={isOpenModalFilter} onClose={onCloseModalFilter}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tipo de Búsqueda</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Seleccione el Tipo de Búsqueda</p>
              <Select
                placeholder="Seleccionar tipo de filtro"
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value={FilterOptions.NAME}>Filtrar por Nombre</option>
                <option value={FilterOptions.PERSONAL_ID}>
                  Filtrar por Cédula
                </option>
              </Select>
              <ModalFooter>
                <Button onClick={handleFilterPreferences} variant="ghost">
                  Guardar preferencia
                </Button>
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenRegisterCashier} onClose={onCloseRegisterCashier}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registar Cajero</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <form onSubmit={onSubmitFn}>
                  <FormControl className="flex flex-col">
                    <FormLabel htmlFor="nombre-artículo">
                      Nombre del Cajero:
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Ingrese el nombre del cajero"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                    <FormLabel htmlFor="cedula-cajero">
                      Cédula del Cajero:
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>
                        <Select width="fit-content" {...register("id_type")}>
                          <option value="V">V</option>
                          <option value="E">E</option>
                        </Select>
                        {errors.phone_code && (
                          <span className="text-red-500">
                            {errors.phone_code.message}
                          </span>
                        )}
                      </InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Ingrese la cédula  del cajero"
                        {...register("personal_id")}
                      />
                    </InputGroup>
                    {errors.personal_id && (
                      <div className="text-red-500">
                        {errors.personal_id.message}
                      </div>
                    )}

                    <FormLabel htmlFor="numero-telefonico">
                      Número Telefónico
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>
                        <Select width="fit-content" {...register("phone_code")}>
                          <option value="412">412</option>
                          <option value="416">416</option>
                          <option value="426">426</option>
                          <option value="414">414</option>
                          <option value="424">424</option>
                        </Select>
                      </InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Ingrese el número telefónico del cajero"
                        {...register("phone_number")}
                      />
                    </InputGroup>
                    {errors.phone_number && (
                      <div className="text-red-500">
                        {errors.phone_number.message}
                      </div>
                    )}
                    <FormLabel htmlFor="estado">Residencia</FormLabel>
                    <InputGroup>
                      <Select
                        {...register("state")}
                        placeholder="Seleccione el estado donde vive."
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
                        <option value="distrito_capital">
                          Distrito Capital
                        </option>
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
                        {errors.state.message}
                      </span>
                    )}

                    <FormLabel htmlFor="correo-electronico">
                      Correo Electrónico
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Ingrese el correo electrónico del cajero"
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                    <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
                    <Input
                      type="password"
                      placeholder="Ingrese la contraseña"
                      {...register("password")}
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                    <FormLabel htmlFor="contraseña">
                      Confirmar contraseña
                    </FormLabel>
                    <Input
                      type="password"
                      placeholder="Ingrese nuevamente su contraseña"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                    <Button type="submit" marginTop="10px">
                      Registrar
                    </Button>
                  </FormControl>
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost">Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Table variant="striped" size="lg" borderColor="teal.500">
          <Thead>
            <Tr>
              {col.map((column, index) => (
                <Th textAlign="center" key={index}>
                  {column.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((cashier, index) => (
              <Tr
                key={index}
                textAlign="center"
                className={`${
                  cashier.User.is_deleted ? "text-gray-300" : "text-black"
                }`}
                p={4}
                fontSize="lg"
              >
                <Td>
                  <div className={"text-center"}>
                    {cashier.User.personal_id}
                  </div>
                </Td>
                <Td>
                  <div className="text-center">{cashier.User.name}</div>
                </Td>
                <Td>
                  <div className="text-center">
                    {cashier.rendered_is_online}
                  </div>
                </Td>
                <Td>
                  <div className="text-center">
                    {cashier.User.phone_number.length === 0
                      ? "Número no asignado"
                      : cashier.User.phone_number}
                  </div>
                </Td>
                <Td onClick={() => setSelectedCashier([cashier, index])}>
                  <div className="text-center">{cashier.btnAction}</div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </section>
    </div>
  );
}
