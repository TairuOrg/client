"use client";
import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { CiFilter } from "react-icons/ci";
import { MdOutlineSearch } from "react-icons/md";
import { FaSort } from "react-icons/fa";

import {
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Badge,
} from "@chakra-ui/react";
type Item = {
  name: string;
  barcode: string;
  quantity: any;
  price: number;
  onClickAction: () => any;
};

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const data: Item[] = [
    {
      name: "Harina pan",
      barcode: "123456789",
      quantity: <Badge size='lg' variant='solid' colorScheme='green'> DISPONIBLE </Badge>,
      price: 10,
      onClickAction: () => (
        <Button onClick={onOpen} colorScheme="teal">
          Ver detalles
        </Button>
      ),
    },
    {
      name: "Arroz",
      barcode: "987654321",
      quantity: <Badge size='lg' variant='solid' colorScheme='green'> DISPONIBLE </Badge>,
      price: 10,
      onClickAction: () => <Button colorScheme="teal"> Ver detalles </Button>,
    },
    {
      name: "Pasta",
      barcode: "1234999789",
      quantity: <Badge size='lg' variant='solid' colorScheme='green'> DISPONIBLE </Badge>,
      price: 10,
      onClickAction: () => <Button colorScheme="teal"> Ver detalles </Button>,
    },
    {
      name: "Azucar",
      barcode: "9876554321",
      quantity: <Badge size='lg' variant='solid' colorScheme='red'> AGOTADO </Badge>,
      price: 10,
      onClickAction: () => <Button colorScheme="teal"> Ver detalles </Button>,
    },
    {
      name: "Cafe",
      barcode: "123456789",
      quantity: <Badge size='lg' variant='solid' colorScheme='yellow'> CERCA DEL LÍMITE </Badge>,
      price: 10,
      onClickAction: () => <Button colorScheme="teal"> Ver detalles </Button>,
    },
    {
      name: "Leche",
      barcode: "987654321",
      quantity:  <Badge size='lg' variant='solid' colorScheme='yellow'> CERCA DEL LÍMITE </Badge>,
      price: 10,
      onClickAction: () => <Button colorScheme="teal"> Ver detalles </Button>,
    },
    {
      name: "Huevos",
      barcode: "1234999789",
      quantity:  <Badge size='lg' variant='solid' colorScheme='red'> AGOTADO </Badge>,
      price: 10,
      onClickAction: () => <Button colorScheme="teal"> Ver detalles </Button>,
    },

  ];

  const cols: ColumnDef<Item>[] = [
    {
      id: "name",
      header: "Nombre del producto",
      accessorKey: "name",
      cell: (info) => info.getValue(),
    },
    {
      id: "price",
      header: "Precio del producto",
      accessorKey: "price",
      cell: (info) => info.getValue(),
    },
    {
      id: "quantity",
      header: "Estado en inventario",
      accessorKey: "quantity",
      cell: (info) => info.getValue(),
    },
    {
      id: "barcode",
      header: "Codigo de barras",
      accessorKey: "barcode",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Acciones",
      accessorKey: "onClickAction",
      cell: (info) => {
        return <button onClick={info.getValue}>Ver detalles</button>;
      },
    },
  ];
  const { getHeaderGroups } = useReactTable({
    columns: cols,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col w-full items-center p-[100px] gap-4">
      <div className="flex gap-4 w-[800px] ">
        <form action="" className="flex flex-row gap-4">
          <input
            type="text"
            className="w-[600px] px-2 rounded-lg"
            placeholder="NOMBRE DEL PRODUCTO"
          />

          <button className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white">
            <MdOutlineSearch size="30" />
          </button>
        </form>
        <button className="rounded-[20px] h-[50px] w-[50px]  flex items-center justify-center  text-center bg-white">
          {" "}
          <CiFilter size="30" />{" "}
        </button>
        <button className="rounded-[20px] h-[50px] w-[50px]  flex items-center justify-center text-center bg-white">
          {" "}
          <FaSort size="30" />{" "}
        </button>
      </div>
      <section className=" flex flex-col w-full justify-start items-center h-fit rounded-lg border-teal-700 border-[2px] p-4">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Modal body text goes here.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Table variant="striped" size="lg">
          <Thead>
            {getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (
                      header // map over the headerGroup headers array
                    ) => (
                      <th key={header.id} colSpan={header.colSpan}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    )
                  )}
                </tr>
              );
            })}
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <div className="text-center">{item.name}</div>
                </Td>
                <Td>
                  <div className="text-center">{item.price}</div>
                </Td>
                <Td>
                  <div className="text-center">{item.quantity}</div>
                </Td>
                <Td>
                  <div className="text-center">{item.barcode}</div>
                </Td>
                <Td>
                  <div className="text-center">{item.onClickAction()}</div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </section>
    </div>
  );
}
