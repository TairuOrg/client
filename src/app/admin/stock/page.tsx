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
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
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
  const [selectedItem, setSelectedItem] = useState<[Item, number] | null>(null);
  const [actionsMode, setActionsMode] = useState<string>("decrease");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {setIsEditing(event.target.checked);};
  const [itemName, setItemName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUpdateClick = () => {
    if (!checkFormValidity()) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor completa todos los campos antes de actualizar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }  else {
      toast({
        title: "Formulario completo",
        description: "Todos los campos se actualizaron correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    console.log('boton de actualizar:', itemName, price, barcode, manufacturer, quantity);
  };

  
  const checkFormValidity = () => {
    if (itemName.trim() !== '' && barcode.trim() !== '' && quantity.trim() !== '' && manufacturer.trim() !== '' && price.trim() !== '') {
      setIsFormValid(true);
      return true;
    } else {
      setIsFormValid(false);
      console.log("no valido")
      return false;
    }
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
                <form>
                  <FormControl>
                    {/*<RadioGroup name="actions" defaultValue="decrease" onChange={(e) => setActionsMode(e)}>
                      <Radio value="decrease">
                        Disminuir artículos del inventario
                      </Radio>
                      {<Radio value="increase">
                        Aumentar artículos del inventario
                      </Radio>}
                    </RadioGroup>

                    <FormLabel>
                      Cantidad a disminuir
                      <Input type="number" isDisabled={actionsMode === 'increase'}/>
                    </FormLabel>*/}

                    <Checkbox name="actions" onChange={handleCheckboxChange} checked={isEditing}>
                      ¿Deseas editar algún artículo?
                    </Checkbox>

                    <FormLabel htmlFor="nombre-artículo">Nombre del Artículo:
                      <Input type="text" placeholder = "Ingrese el nombre del artículo" isDisabled={!isEditing} value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </FormLabel>

                    <FormLabel htmlFor="código-artículo">Código del Artículo:
                      <Input placeholder = "Ingrese el código del artículo" type="number" isDisabled={!isEditing} value={barcode} onChange={(e) => setBarcode(e.target.value)}/>
                    </FormLabel>
                    
                    <FormLabel htmlFor="cantidad-artículo">Cantidad del Artículo:
                      <Input placeholder = "Ingrese la cantidad del artículo" type="number"isDisabled={!isEditing} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    </FormLabel>
                    
                    <FormLabel htmlFor="fabricante">Fabricante:
                      <Input placeholder = "Ingrese el fabricante"type="text" isDisabled={!isEditing} value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}/>
                    </FormLabel>

                    <FormLabel htmlFor="precio-Unitario">Precio Unitario:
                      <Input placeholder = "Ingrese el precio unitario" type="number" isDisabled={!isEditing} value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </FormLabel>

                    <Button onClick={handleUpdateClick} isDisabled={!isEditing} >Actualizar</Button>
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
