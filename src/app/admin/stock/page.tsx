"use client";
import { useEffect, useState } from "react";
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
import { stockItems } from "@/actions/stock";
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
  Select,
  useToast,
} from "@chakra-ui/react";
import { Item } from "@/types";

enum FilterOptions {
  NAME = "name",
  BARCODE = "barcode",
}

export default function Page() {
  const toast = useToast();
  const {
    isOpen: isOpenModalDetails,
    onOpen: onOpenModalDetails,
    onClose: onCloseModalDetails,
  } = useDisclosure();
  const {
    isOpen: isOpenModalFilter,
    onOpen: onOpenModalFilter,
    onClose: onCloseModalFilter,
  } = useDisclosure();

  const handleFilterPreferences = () => {
    onCloseModalFilter();
    toast({
      title: "Preferencia guardada",
      description: "Se ha guardado su preferencia de filtro",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const [data, setData] = useState<Item[]>([]); // data is an array of items
  const [filterOption, setFilterOption] = useState<string>(FilterOptions.NAME);
  const [filterValue, setFilterValue] = useState<string>("");
  const [reloadFromServer, setReloadFromServer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          body: { payload },
        } = await stockItems();

        const newPayload = payload.map((item: Item) => {
          return {
            ...item,
            price: `$ ${item.price}`,
            renderedStatus: (
              <Badge
                size="lg"
                colorScheme={item.quantity > 50 ? "green" : "red"}
              >
                {item.quantity > 50 ? "Disponible" : "Últimas unidades"}
              </Badge>
            ),
            btnAction: (
              <Button
                colorScheme="teal"
                onClick={onOpenModalDetails}
                variant={"outline"}
              >
                Ver detalles
              </Button>
            ),
          };
        });
        setData(newPayload);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error when fetching data from server");
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
          data.filter((item) => item.name.toLowerCase().includes(filterValue))
        );
        break;

      case FilterOptions.BARCODE:
        setData(data.filter((item) => item.barcode_id.includes(filterValue)));
        break;

      default:
        throw new Error("Malformed filter option");
    }

    if (filterValue !== "" && data.length === 0) {
      toast({
        title: "No se encontraron resultados",
        description: "No se encontraron resultados para su búsqueda",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [filterValue]);

  const cols: ColumnDef<Item>[] = [
    {
      id: "name",
      header: "Nombre del producto",
      accessorKey: "name",
      cell: (info) => info.getValue(),
    },
    {
      id: "price",
      header: "Precio del producto (USD) ",
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
      header: "Código de barras",
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
        <form className="flex flex-row gap-4">
          <input
            onChange={(e) => setFilterValue(e.target.value)}
            type="text"
            className="w-[600px] px-2 rounded-lg"
            placeholder={
              filterOption === FilterOptions.NAME
                ? "Buscar por nombre"
                : "Buscar por código"
            }
          />

          <button className="rounded-[20px] h-[50px] w-[50px] flex items-center justify-center text-center bg-white">
            <MdOutlineSearch size="30" />
          </button>
        </form>

        <button
          onClick={onOpenModalFilter}
          className="rounded-[20px] h-[50px] w-[50px]  flex items-center justify-center  text-center bg-white"
        >
          {" "}
          <CiFilter size="30" />{" "}
        </button>
        <button className="rounded-[20px] h-[50px] w-[50px]  flex items-center justify-center text-center bg-white">
          {" "}
          <FaSort size="30" />{" "}
        </button>
      </div>
      <section className=" flex flex-col w-full justify-start items-center h-fit rounded-lg border-teal-700 border-[2px] p-4">
        <Modal isOpen={isOpenModalFilter} onClose={onCloseModalFilter}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tipo de búsqueda</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Elija el tipo de dada</p>
              <Select
                placeholder="Seleccionar tipo de filtro"
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value={FilterOptions.NAME}>Filtrar por Nombre</option>
                <option value={FilterOptions.BARCODE}>
                  Filtrar por Código
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

        <Modal isOpen={isOpenModalDetails} onClose={onCloseModalDetails}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Producto: {selectedItem?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ul>
                <li>
                  <strong>Código:</strong> {selectedItem?.barcode_id}
                </li>
                <li>
                  <strong> Categoría:</strong> {selectedItem?.category}
                </li>
                <li>
                  <strong> Fabricante:</strong> {selectedItem?.manufacturer}
                </li>
                <li>
                  <strong>Precio unitario:</strong> {selectedItem?.price}
                </li>
                <li>
                  <strong> Cantidad: </strong> {selectedItem?.quantity}
                </li>
                <li>
                  <strong>Estado:</strong> {selectedItem?.renderedStatus}
                </li>
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseModalDetails}variant="ghost">Cerrar</Button>
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
                  <div className="text-center">{item.renderedStatus}</div>
                </Td>
                <Td>
                  <div className="text-center">{item.barcode_id}</div>
                </Td>
                <Td onClick={() => setSelectedItem(item)}>
                  <div className="text-center">{item.btnAction}</div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </section>
    </div>
  );
}
