"use client";
import {Suspense, useEffect, useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { CiFilter } from "react-icons/ci";
import { MdOutlineSearch } from "react-icons/md";

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
  FormControl,
  FormLabel,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { Item } from "@/types";
import { useForm } from "react-hook-form";
import { ModifyItemSchema, modifyItemSchema } from "@/schemas/modifyItemSchema";
import { zodResolver } from "@hookform/resolvers/zod";

enum FilterOptions {
  NAME = "name",
  BARCODE = "barcode",
}

export default function Page() {
  const [data, setData] = useState<Item[]>([]); // data is an array of items
  const [filterOption, setFilterOption] = useState<string>(FilterOptions.NAME);
  const [filterValue, setFilterValue] = useState<string>("");
  const [reloadFromServer, setReloadFromServer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<[Item, number] | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(event.target.checked);
  };
  const [itemName, setItemName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);
  const toast = useToast();

  const handleModifyItemSubmit = (d: any) => {
    console.log("lol", d);
  };
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModifyItemSchema>({
    resolver: zodResolver(modifyItemSchema(selectedItem?.[0].quantity as number)),
    mode: "onChange",
    shouldFocusError: true,
    delayError: 5,
  });

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          body: { payload },
        } = await stockItems();

        const newPayload = payload.map((item: Item) => {
          return {
            ...item,
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
      </div>
      <section className="w-full h-fit rounded-lg border-teal-700 border-[2px] p-4">
        <Modal isOpen={isOpenModalFilter} onClose={onCloseModalFilter}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tipo de búsqueda</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Elija el tipo de búsqueda</p>
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
            <ModalHeader>Producto: {selectedItem?.[0].name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col gap-4">
                <ul>
                  <li>
                    <strong>Código:</strong> {selectedItem?.[0].barcode_id}
                  </li>
                  <li>
                    <strong>Categoría:</strong> {selectedItem?.[0].category}
                  </li>
                  <li>
                    <strong>Fabricante:</strong>{" "}
                    {selectedItem?.[0].manufacturer}
                  </li>
                  <li>
                    <strong>Precio unitario:</strong> {selectedItem?.[0].price}
                  </li>
                  <li>
                    <strong>Cantidad: </strong> {selectedItem?.[0].quantity}
                  </li>
                  <li>
                    <strong>Estado:</strong> {selectedItem?.[0].renderedStatus}
                  </li>
                </ul>

                <hr />
                <h1>Opciones de Edición: {selectedItem?.[0].name}</h1>
                <form onSubmit={handleSubmit(handleModifyItemSubmit)}>
                  <FormControl className="flex flex-col">
                    <Checkbox
                      name="actions"
                      onChange={handleCheckboxChange}
                      checked={isEditing}
                    >
                      ¿Deseas editar algún artículo?
                    </Checkbox>

                    <FormLabel htmlFor="nombre-artículo">
                      Nombre del Artículo:
                    </FormLabel>
                    <Input
                      type="text"
                      isDisabled={!isEditing}
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}

                    <FormLabel htmlFor="código-artículo">
                      Código del Artículo:
                    </FormLabel>
                    <Input
                      type="number"
                      isDisabled={!isEditing}
                      {...register("barcode")}
                    />
                    {errors.barcode && (
                      <span className="text-red-500">
                        {errors.barcode.message}
                      </span>
                    )}

                    <FormLabel htmlFor="cantidad-artículo">
                      Cantidad del Artículo:
                    </FormLabel>
                    <Input
                      type="number"
                      isDisabled={!isEditing}
                      {...register("stock")}
                    />
                    {errors.stock && (
                      <span className="text-red-500">
                        {errors.stock.message}
                      </span>
                    )}

                    <FormLabel htmlFor="fabricante">Fabricante:</FormLabel>
                    <Input
                      type="text"
                      isDisabled={!isEditing}
                      {...register("manufacturer")}
                    />
                    {errors.manufacturer && (
                      <span className="text-red-500">
                        {errors.manufacturer.message}
                      </span>
                    )}

                    <FormLabel htmlFor="precio-Unitario">
                      Precio Unitario:
                    </FormLabel>
                    <Input
                      type="number"
                      isDisabled={!isEditing}
                      {...register("price")}
                    />
                    {errors.price && (
                      <span className="text-red-500">
                        {errors.price.message}
                      </span>
                    )}

                    <Button type="submit" isDisabled={!isEditing}>
                      Actualizar
                    </Button>
                  </FormControl>
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseModalDetails} variant="ghost">
                Cerrar
              </Button>
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
                <Td onClick={() => setSelectedItem([item, index])}>
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
