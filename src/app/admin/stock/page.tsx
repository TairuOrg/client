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

import { stockItems } from "@/actions/stock";
import { useRouter } from "next/navigation";
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
  Spinner,
} from "@chakra-ui/react";
import { Entry, Item, EntryItem } from "@/types";
import { useForm } from "react-hook-form";
import { ModifyItemSchema, modifyItemSchema } from "@/schemas/modifyItemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateStockItem } from "@/actions/stock";
import { loadEntries, createEntry as createEntryFn } from "@/actions/entries";
import { addItemSchema, AddItemSchemaType } from "@/schemas/AddItemSchema";
import { retrieveUserInfo } from "@/actions/retrieveUserInfo";
import { getSales } from "@/actions/sales";

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
  const [entries, setEntries] = useState<Entry[] | null>(null);
  // Defines the state of the entries modal: how the user can interact with the entries
  const [showEntries, setShowEntries] = useState<boolean>(false);
  const [createEntry, setCreateEntry] = useState<boolean>(false);

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [addedEntry, setAddedEntry] = useState<Entry | null>(null);
  const [admin_logged_in, set_admin_logged_in] = useState<number>(-1);

  const toast = useToast();
  const router = useRouter()
  const {
    isOpen: isOpenModalDetails,
    onOpen: onOpenModalDetails,
    onClose: onCloseModalDetails,
  } = useDisclosure();

  const handleOnCloseModalDetails = () => {
    onCloseModalDetails()
    setIsEditing(!isEditing)
    resetItemModificationForm()
  }
  const {
    isOpen: isOpenModalFilter,
    onOpen: onOpenModalFilter,
    onClose: onCloseModalFilter,
  } = useDisclosure();

  const {
    isOpen: isOpenModalEntries,
    onOpen: onOpenMOdalEntries,
    onClose: onCloseModalEntries,
  } = useDisclosure();

  const handleModifyItemSubmit = (d: ModifyItemSchema) => {
    const dataToSend = {
      ...d,
      category: selectedItem?.[0].category as string,
      old_barcode_id: selectedItem?.[0].barcode_id as string,
    };
    try {
      updateStockItem(dataToSend);
      toast({
        title: "Artículo actualizado correctamente",
        status: "success",
      });
      setReloadFromServer(true);
      onCloseModalDetails();
    } catch (error) {
      toast({
        title: "No se ha podido actualizar el artículo",
        status: "error",
      });
    }
  };

  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    formState: { errors: errorsItem },
    reset: resetItemModificationForm,
  } = useForm<ModifyItemSchema>({
    resolver: zodResolver(
      modifyItemSchema(selectedItem?.[0].quantity as number)
    ),
    mode: "onChange",
    shouldFocusError: true,
    delayError: 5,
  });

  const {
    register: registerEntry,
    handleSubmit: handleSubmitEntry,
    formState: { errors: errorsEntry },
    reset: resetEntry,
  } = useForm<AddItemSchemaType>({
    resolver: zodResolver(addItemSchema),
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

  const handleShowEntries = async () => {
    const {
      body: { payload },
    } = await loadEntries();
    setEntries(payload);
    setShowEntries(!showEntries);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(event.target.checked);
  };

  const handleCreateEntry = () => {
    setCreateEntry(!createEntry);
  };

  const handleSaveEntries = () => {
    const entry_to_add = addedEntry as Entry;
    createEntryFn(entry_to_add);
    setReloadFromServer(!reloadFromServer);
    resetEntry({
      add_quantity: "",
      barcode_id: "",
      category: "",
      description: "",
      manufacturer: "",
      name: "",
      price: "",
    });
    setAddedEntry(null);
    
    onCloseModalEntries()
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
    (async () => {
      const { id } = await retrieveUserInfo();
      set_admin_logged_in(id);
    })();
  }, []);

  useEffect(() => {
    if (filterValue === "") {
      setReloadFromServer(true);
      return setData(data);
    }
    switch (filterOption) {
      case FilterOptions.NAME:
        setData(
          data.filter((item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase())
          )
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
    <div className="flex flex-col w-full items-center p-[100px] gap-4 min-h-fit max-h-[800px]">
      <div className="flex gap-4 w-fit ">
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
        <button
          className="rounded-xl h-fit w-fit p-4 text-center bg-white"
          onClick={(e)=> {
            getSales().then(e => {
              router.replace('/admin/sales')
            })
          }}
        >
          Ventas
        </button>
        <button
          className="rounded-xl h-fit w-fit p-4 text-center bg-white"
          onClick={onOpenMOdalEntries}
        >
          Entradas en inventario
        </button>
        
      </div>
      <section className="w-full h-fit rounded-lg border-teal-700 border-[2px] p-4 overflow-y-scroll">
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

        <Modal isOpen={isOpenModalEntries} onClose={onCloseModalEntries}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Entradas en inventario</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col gap-4">
              <Button
                onClick={(e) => handleShowEntries()}
                isDisabled={createEntry}
              >
                {" "}
                {showEntries ? "Cerrar el" : "Visualizar el"} historial de
                entradas{" "}
              </Button>
              <Button onClick={handleCreateEntry} isDisabled={showEntries}>
                Crear entrada
              </Button>

              {showEntries && !createEntry && (
                <Select
                  placeholder="Seleccione una entrada para ver detalles"
                  onChange={(e) =>
                    setSelectedEntry(entries![parseInt(e.target.value)])
                  }
                >
                  {entries?.map((entry, idx) => (
                    <option key={entry.id} value={idx}>
                      {" "}
                      {entry.description}
                    </option>
                  ))}
                </Select>
              )}

              {selectedEntry && !createEntry && (
                <section>
                  <p>Código de la entrada: {selectedEntry.id}</p>
                  <p>Nombre: {selectedEntry.description}</p>

                  <ul>
                    {selectedEntry.entries_items &&
                    selectedEntry.entries_items.length > 0 ? (
                      selectedEntry.entries_items.map((i: any) => (
                        <>
                          <li key={i.items.name}> {i.items.name}</li>
                          <li key={i.items.barcode_id}>
                            {" "}
                            <strong>Código: </strong>
                            {i.items.barcode_id}
                          </li>
                          <li key={i.quantity}>
                            {" "}
                            <strong>Cantidad ingresada: </strong>
                            {i.quantity}
                          </li>
                          <li key={i.items.price}>
                            {" "}
                            <strong> Precio unitario: $</strong>
                            {i.items.price}
                          </li>
                          <li key={i.items.manufacturer}>
                            {" "}
                            <strong>Fabricante:</strong>
                            {i.items.manufacturer}
                          </li>
                        </>
                      ))
                    ) : (
                      <li>No hay elementos</li>
                    )}
                  </ul>
                </section>
              )}
              {createEntry && (
                <form
                  onSubmit={handleSubmitEntry((payload) => {
                    /*
                    Data is composed of the folowing fields:
                    - description: string => description of the entry
                    - name: string => name of the item
                    - barcode_id: string => barcode of the item 
                    - manufacturer: string => manufacturer of the item
                    - category: string  => category of the item
                    - add_quantity: string  => quantity of the item
                    - price: string => price of the item

                    */
                    const data = {
                      ...payload,
                      add_quantity: parseInt(payload.add_quantity),
                      item_id: null,
                      price: parseFloat(payload.price),
                    };
                    
                    setAddedEntry({
                      admin_id: admin_logged_in,
                      description: data.description,
                      date: new Date(),
                      entries_items: [
                        ...((addedEntry?.entries_items as EntryItem[]) || []),
                        data,
                      ],
                    });

                    resetEntry({
                      add_quantity: "",
                      barcode_id: "",
                      category: "",
                      description: data.description,
                      manufacturer: "",
                      name: "",
                      price: "",

                    });
                  })}
                >
                  <FormControl className="flex flex-col gap-2">
                    <FormLabel>
                      Descripción de la entrada:
                    </FormLabel>
                    <Input
                      type="text"
                      {...registerEntry("description")}
                      isDisabled={Boolean(addedEntry)}
                    />
                    {errorsEntry.description && (
                      <span className="text-red-500">
                        {" "}
                        {errorsEntry.description.message}
                      </span>
                    )}

                    <FormLabel>
                      Nombre del artículo:
                    </FormLabel>
                    <Input type="text" {...registerEntry("name")} />
                    {errorsEntry.name && (
                      <span className="text-red-500">
                        {" "}
                        {errorsEntry.name.message}
                      </span>
                    )}

                    <FormLabel> Código de barras</FormLabel>
                    <Input type="text" {...registerEntry("barcode_id")} />
                    {errorsEntry.barcode_id && (
                      <span className="text-red-500">
                        {" "}
                        {errorsEntry.barcode_id.message}
                      </span>
                    )}

                    <FormLabel>Fabricante:</FormLabel>
                    <Input type="text" {...registerEntry("manufacturer")} />
                    {errorsEntry.manufacturer && (
                      <span className="text-red-500">
                        {" "}
                        {errorsEntry.manufacturer.message}
                      </span>
                    )}

                    <FormLabel>Categoría del artículo</FormLabel>
                    <Select
                      placeholder="Seleccione una categoría"
                      {...registerEntry("category")}
                    >
                      <option value="higiene">Higiene</option>
                      <option value="confitería">Confitería</option>
                      <option value="charcutería">Charcutería</option>
                      <option value="víveres"> Víveres</option>
                    </Select>
                    {errorsEntry.category && (
                      <span className="text-red-500">
                        {" "}
                        {errorsEntry.category.message}
                      </span>
                    )}

                    <FormLabel>Cantidad:</FormLabel>
                    <Input type="text" {...registerEntry("add_quantity")} />
                    {errorsEntry.add_quantity && (
                      <span className="text-red-500">
                        {" "}
                        {errorsEntry.add_quantity.message}
                      </span>
                    )}

                    <FormLabel>Precio unitario:</FormLabel>
                    <Input type="string" {...registerEntry("price")} />
                    {errorsEntry.price && (
                      <span className="text-red-500">
                        {" "}
                        {errorsEntry.price.message}
                      </span>
                    )}

                    <Button
                      type="submit"
                      isDisabled={Boolean(
                        Object.entries(errorsEntry).length > 0
                      )}
                    >
                      Agregar artículo
                    </Button>
                  </FormControl>
                </form>
              )}
              {addedEntry &&
                !showEntries &&
                addedEntry.entries_items.length > 0 && (
                  <>
                    <p>Artículos agregados: </p>
                    <ul>
                      {addedEntry.entries_items.map((i) => (
                        <li key={i.name}>
                          Nombre: {i.name} | Cantidad: {i.add_quantity}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
            </ModalBody>
            <ModalFooter>
              {createEntry && (
                <Button onClick={handleSaveEntries} variant="ghost">
                  Guardar entrada
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenModalDetails} onClose={handleOnCloseModalDetails}>
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
                <form onSubmit={handleSubmitItem(handleModifyItemSubmit)}>
                  <FormControl className="flex flex-col">
                    <Checkbox
                      name="actions"
                      onChange={handleCheckboxChange}
                      checked={isEditing}
                    >
                      ¿Deseas editar algún artículo?
                    </Checkbox>

                    <FormLabel htmlFor="nombre-artículo">
                      Nombre del Artículo :
                    </FormLabel>
                    <Input
                      type="text"
                      isDisabled={!isEditing}
                      {...registerItem("name")}
                    />
                    {errorsItem.name && (
                      <span className="text-red-500">
                        {errorsItem.name.message}
                      </span>
                    )}

                    <FormLabel htmlFor="código-artículo">
                      Código del Artículo:
                    </FormLabel>
                    <Input
                      type="number"
                      isDisabled={!isEditing}
                      {...registerItem("barcode_id")}
                    />
                    {errorsItem.barcode_id && (
                      <span className="text-red-500">
                        {errorsItem.barcode_id.message}
                      </span>
                    )}

                    <FormLabel htmlFor="cantidad-artículo">
                      Cantidad del Artículo:
                    </FormLabel>
                    <Input
                      type="number"
                      isDisabled={!isEditing}
                      {...registerItem("quantity")}
                    />
                    {errorsItem.quantity && (
                      <span className="text-red-500">
                        {errorsItem.quantity.message}
                      </span>
                    )}

                    <FormLabel htmlFor="fabricante">Fabricante:</FormLabel>
                    <Input
                      type="text"
                      isDisabled={!isEditing}
                      {...registerItem("manufacturer")}
                    />
                    {errorsItem.manufacturer && (
                      <span className="text-red-500">
                        {errorsItem.manufacturer.message}
                      </span>
                    )}

                    <FormLabel htmlFor="precio-Unitario">
                      Precio Unitario:
                    </FormLabel>
                    <Input
                      type="text"
                      isDisabled={!isEditing}
                      {...registerItem("price")}
                    />
                    {errorsItem.price && (
                      <span className="text-red-500">
                        {errorsItem.price.message}
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

            {data.length === 0 && (
              <Tr>
                <Td colSpan={5}>
                  <div className="text-3xl flex gap-4 justify-center"><Spinner size={'lg'}/> Cargando resultados</div>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </section>
    </div>
  );
}
