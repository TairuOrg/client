"use client";
import {useEffect, useState} from 'react';
import { Table, Thead, Tbody, Tr, Th, Td,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Select, Button, ModalFooter,useToast} from '@chakra-ui/react';
import { MdOutlineSearch } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { cashiersInfo } from "@/actions/cashier";
import { Cashiers} from '@/types';

export default function CashierPage() {

  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);
  const toast = useToast();
  const [data, setData] = useState<Cashiers[]>([]);
  const openModalFilter = () => {
    setIsOpenModalFilter(true);
  };

  const closeModalFilter = () => {
    setIsOpenModalFilter(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cashiersInfo();
        console.log("Payload.....", result.body.payload);
        setData(result.body.payload);

      } catch (error) {
        console.error("Error fetching data:", error);
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
      header:'Cédula',
      id:'cashier_personal_id'
    },
    {
      header: 'Nombre del cajero',
      id: 'cashiers_name'
    },
    {
      header: 'Estado del cajero',
      id: 'cashier_status'
    },
    {
      header:'Número Telefónico',
      id:'cashier_phone'
    },
    {
      header:'Acciones',
      id:'cashier_accions'
    }
  ]

  const handleFilterButtonClick = () => {
    openModalFilter(); 
  };
  
  return (
  <div className='flex flex-col justify-items items-center w-full p-[100px] gap-4'>
    <form className=" flex flex-row gap-4">
      <input
          type="text"
          className="w-[600px] px-2 rounded-lg h-[50px]"
          placeholder='Buscar aqui'
        />
        <button className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white">
            <MdOutlineSearch size="30"/>
        </button>
        
        <button type="button" onClick={handleFilterButtonClick} className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white">
            <CiFilter size="30"/>
        </button>

        <button className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white">
          <FaUserPlus size="30"/>
        </button>
    </form>
   
    <section className='border-teal-700 border-[2px] p-4 rounded-lg w-full h-fit'>
        <Modal isOpen={isOpenModalFilter} onClose={closeModalFilter}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Tipo de Búsqueda</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <p>Seleccione el Tipo de Búsqueda</p>
              <Select placeholder="Seleccionar tipo de filtro">
                <option>Filtrar por Nombre</option>
                <option>Filtrar por Id</option>
                <option>Filtrar por Cédula</option>
              </Select>
              <ModalFooter>
                <Button variant="ghost">
                  Guardar preferencia
                </Button>
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Table variant="striped"size="lg" borderColor="teal.500">
            <Thead>
              <Tr>
                {col.map((column, index) => (
                    <Th textAlign="center" key={index}>{column.header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((cashier, index) => (
                <Tr key={index} textAlign="center" p={4} fontSize="lg">
                  <Td>
                    <div className="text-center">
                      {cashier.User.personal_id}
                    </div>
                  </Td>
                  <Td>
                    <div className="text-center">
                      {cashier.User.name}
                    </div>
                  </Td>
                  <Td>
                    <div className="text-center">
                      {cashier.is_online ? 'Activo' : 'Inactivo'}
                    </div>
                  </Td>
                  <Td>
                    <div className="text-center">
                      {cashier.User.phone_number}
                    </div>
                  </Td>
                 
                </Tr>
              ))}
            </Tbody>
          </Table>
    </section>
  </div>
  );
}
