"use client";
import {useEffect, useState} from 'react';
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
} from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { cashiersInfo } from "@/actions/cashier";
import { Cashier } from "@/types";

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
  const toast = useToast();
  const [data, setData] = useState<Cashier[]>([]);
  const [filterOption, setFilterOption] = useState<string>(FilterOptions.NAME);

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
              <Button colorScheme="red" variant={"outline"}>
                Eliminar
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
  }, []);

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
          placeholder={
            filterOption === FilterOptions.NAME
              ? "Buscar cajero por su nombre"
              : filterOption === FilterOptions.PERSONAL_ID
              ? "Buscar cajero por su cédula"
              : "Buscar cajero por su ID"
          }
        />
        <button className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white">
          <MdOutlineSearch size="30" />
        </button>

        <button
          type="button"
          onClick={handleFilterButtonClick}
          className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white"
        >
          <CiFilter size="30" />
        </button>

        <button onClick = {onOpenRegisterCashier} type='button' className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white">
          <FaUserPlus size="30" />
        </button>
      </form>

      <section className="border-teal-700 border-[2px] p-4 rounded-lg w-full h-fit">
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
                <option value={FilterOptions.ID}>Filtrar por ID</option>
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
            Esto debe ser un formulario de registro de cajero
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
              <Tr key={index} textAlign="center" p={4} fontSize="lg">
                <Td>
                  <div className="text-center">{cashier.User.personal_id}</div>
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
                  <div className="text-center">{cashier.User.phone_number}</div>
                </Td>
                <Td>
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
