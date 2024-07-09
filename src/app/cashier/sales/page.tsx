"use client";

import {
  beginSale,
  cancelSale,
  commitSale,
  modifyProductsQuantity,
  removeItemFromSale,
} from "@/actions/cashier/sales";
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect,  useState } from "react";
import { getProductsFromSale } from "@/actions/cashier/sales";
import QRCode from "react-qr-code";
import { Item, SaleItems } from "@/types";
import { getCustomerInformation } from "@/actions/cashier/customers";

const Loading = () => <div>Loading...</div>;


export default function Page() {
  const toast = useToast();
  const router = useRouter();
  const [params, setParams] = useState({
    cashier_id: 0,
    customer_personal_id: "",
  });
  const [salesID, setSalesID] = useState<number | null>(null);
  const [createSalePressed, setCreateSalePressed] = useState(false);
  const [products, setProducts] = useState<SaleItems[]>([] as any[]);
  const [reloadDataFromServer, setReloadDataFromServer] = useState(false);
  const path = useSearchParams();
  const [isNumberInputEnabled, setIsNumberInputEnabled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<[Item, number]>(); // Item, index in products
  const [quantityToModify, setQuantityToModify] = useState(0);
  const [customerName, setCustomerName] = useState('')
  // Modify the quantity of the selected product
  const handleModifyQuantity = (newQuantity: number) => {
    if (products && selectedProduct && salesID) {
      products[selectedProduct[1]].quantity = newQuantity;
      modifyProductsQuantity({
        sale_id: salesID.toString(),
        item_barcode_id: selectedProduct[0].barcode_id,
        quantity: newQuantity.toString(),
      });
    } else {
      toast({
        title: "No se ha seleccionado un producto",
        status: "error",
        duration: 2000,
      });
    }
  };
  const {
    isOpen: isOpenItemModal,
    onOpen: onOpenItemModal,
    onClose: onCloseItemModal,
  } = useDisclosure();

  useEffect(() => {
    setParams({
      cashier_id: parseInt(path.get("cashier_id") as string),
      customer_personal_id: path.get("customer_personal_id") as string,
    });
    getCustomerInformation({personal_id: params.customer_personal_id}).then(data => {
        setCustomerName(data.body.payload.name)
    })
  }, []);

  useEffect(() => {
    (async () => {
      if (salesID) {
        const {
          body: { payload },
        } = await getProductsFromSale({
          sale_id: salesID.toString(),
        });
        const payload_to_insert = payload.map((i) => ({
          ...i,
          items: {
            ...i.items,
            btnAction: (
              <Button onClick={(e) => onOpenItemModal()}>Detalles</Button>
            ),
          },
        }));

        setProducts(payload_to_insert);
      } else {
        toast({
          title: "Crea una venta para continuar",
          status: "info",
          duration: 2000,
        });
        setProducts([]);
      }
    })();
  }, [salesID, reloadDataFromServer]);

  const handleCreateSale = () => {
    beginSale(params).then((res) => {
      setCreateSalePressed(true);
      const {
        body: { payload },
      } = res;
      setSalesID(payload);
    });
  };
  const cols = [
    {
      id: "name",
      header: "Producto",
    },
    {
      id: "price",
      header: "Precio del producto (USD) ",
    },
    {
      id: "quantity",
      header: "Cantidad Agregada",
    },
    {
      id: "barcode",
      header: "Código de barras",
    },
    {
      id: "actions",
      header: "Acciones",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Modal isOpen={isOpenItemModal} onClose={onCloseItemModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del producto</ModalHeader>
          <ModalBody>
            <form>
              <p>Nombre: {selectedProduct?.[0]?.name}</p>
              <p>Precio unitario (USD): {selectedProduct?.[0]?.price}</p>
              <p>Cantidad disponible: {selectedProduct?.[0]?.quantity}</p>
              <p>
                Cantidad agregada:{" "}
                {products && selectedProduct
                  ? products[selectedProduct?.[1]].quantity
                  : ""}
              </p>
              <p>Código de barras:{selectedProduct?.[0]?.barcode_id} </p>
            </form>
            <hr />
            <form>
              <FormControl className="flex flex-col gap-4">
                <Checkbox
                  isChecked={isNumberInputEnabled}
                  onChange={(e) => setIsNumberInputEnabled(e.target.checked)}
                  mt={4}
                >
                  Habilitar modificación de cantidad del artículo
                </Checkbox>
                <FormLabel>Ingrese la cantidad del Artículo:</FormLabel>
                <NumberInput
                  onChange={(e) => setQuantityToModify(parseInt(e))}
                  defaultValue={
                    products && selectedProduct
                      ? products[selectedProduct?.[1]].quantity
                      : ""
                  }
                  min={0}
                  max={selectedProduct?.[0].quantity}
                  isDisabled={!isNumberInputEnabled}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <div className="flex space-x-2 mt-4">
                  <Button
                    colorScheme="green"
                    onClick={(e) => {
                      try {
                        // Update the quantity of the selected product
                        handleModifyQuantity(quantityToModify);
                        toast({
                          title: "Cantidad modificada",
                          status: "success",
                          duration: 2000,
                        });
                      } catch (e) {
                        toast({
                          title: "No se ha seleccionado un producto",
                          status: "error",
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    Guardar Cantidad
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={(e) => {
                      try {
                        if (salesID && selectedProduct) {
                          removeItemFromSale({
                            sale_id: salesID.toString(),
                            item_barcode_id: selectedProduct[0].barcode_id,
                          });
                        } else {
                          toast({
                            title: "No se ha seleccionado un producto",
                            status: "error",
                            duration: 2000,
                          });
                        }
                      } catch (err) {
                        toast({
                          title:
                            "Ha ocurrido un error en la comunicación con el servidor",
                          status: "error",
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    Eliminar producto de la venta
                  </Button>
                </div>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseItemModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <main className="relative w-screen h-screen p-5">
        <section className="flex w-full p-5 items-center justify-around text-center text-teal-50 gap-10 bg-teal-700 rounded-xl">
          <section className="flex gap-10 items-center">
            <span
              className={`h-[210px] w-[210px] ${
                createSalePressed ? "" : "border-4"
              } border-teal-800`}
            >
              {salesID ? (
                <QRCode value={salesID.toString()} size={200} />
              ) : null}
            </span>
            <div className="flex flex-col gap-2">
              {salesID
                ? "Escanea el código QR para continuar con la venta"
                : "Crea una venta para continuar"}

              <Button
                onClick={handleCreateSale}
                isDisabled={createSalePressed}
                size={"lg"}
              >
                {" "}
                Generar código QR
              </Button>
            </div>
          </section>

          <div className="text-start text-2xl">
            <h2>Detalles de la venta:</h2>
            <p>Código de la venta: {salesID ? salesID : "No creado"}</p>
          </div>
          <div className="text-start text-2xl">
            <h2>Detalles del cliente</h2>
            {/* <p>Nombre {customerName}:</p> */}
            <p>Cédula: {params.customer_personal_id}</p>
          </div>
          <div className="text-start text-2xl">
            <h2>Total:</h2>
            <p>
              ${" "}
              {(products.reduce((total, product) => {
                return (
                  (total + product.quantity * parseFloat(product.items.price))
                );
              }, 0.0)).toFixed(2)}
            </p>
          </div>

          <div className="flex flex-col gap-4 text-2xl">
            <h2>Opciones:</h2>
            <Button colorScheme="red" onClick={e => {
                // Commit the sale
                if(salesID) {
                  cancelSale({ sale_id: salesID.toString() });
                  toast({
                    title: "Venta cancelada",
                    status: "info",
                    duration: 2000,
                  });
                  router.back()
                } else{
                  toast({
                    title: "No se seleccionado una venta",
                    status: "error",
                    duration: 2000,
                  });
                }
              }}>
              Cancelar venta
            </Button>
            <Button
              colorScheme="green"
              isDisabled={Boolean(products.length < 1)}
              onClick={e => {
                // Commit the sale
                if(salesID) {
                  commitSale({ sale_id: salesID.toString() });
                  toast({
                    title: "Venta concretada",
                    status: "success",
                    duration: 2000,
                  });
                  
                } else{
                  toast({
                    title: "No se seleccionado una venta",
                    status: "error",
                    duration: 2000,
                  });
                }
              }}
            >
              Concretar venta
            </Button>
            <Button
              onClick={(e) => {
                setReloadDataFromServer(!reloadDataFromServer);
                toast({
                  title: "Recargando...",
                  status: "info",
                  duration: 900,
                });
              }}
            >
              Recargar tabla
            </Button>
          </div>
        </section>

        <section className="w-full h-fit rounded-lg border-teal-700 border-[2px] p-4 mt-10 text-center">
          <Table variant="striped" size="lg" borderColor="teal.700">
            <Thead>
              <Tr>
                {cols.map((col) => (
                  <Th textAlign="center" key={col.id}>
                    {col.header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {products.map((saleItems, index) => (
                <Tr key={index}>
                  <Td>
                    <div className="text-center">{saleItems.items.name}</div>
                  </Td>
                  <Td>
                    <div className="text-center">{saleItems.items.price}</div>
                  </Td>
                  <Td>
                    <div className="text-center">{saleItems.quantity}</div>
                  </Td>
                  <Td>
                    <div className="text-center">
                      {saleItems.items.barcode_id}
                    </div>
                  </Td>
                  <Td
                    onClick={(e) =>
                      setSelectedProduct([saleItems.items, index])
                    }
                  >
                    <div className="text-center">
                      {saleItems.items.btnAction}
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </section>
      </main>
    </Suspense>
  );
}
