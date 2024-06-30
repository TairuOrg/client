"use client";

import { beginSale } from "@/actions/cashier/sales";
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
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductsFromSale } from "@/actions/cashier/sales";
import QRCode from "react-qr-code";
import { SaleItems } from "@/types";

export default function Page() {
  const [params, setParams] = useState({
    cashier_id: 0,
    customer_personal_id: "",
  });
  const [salesID, setSalesID] = useState<number | null>(null);
  const [createSalePressed, setCreateSalePressed] = useState(false);
  const [products, setProducts] = useState<SaleItems[]>([] as any[]);
  const [reloadDataFromServer, setReloadDataFromServer] = useState(false);
  const path = useSearchParams();
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
            btnAction: <Button onClick={(e) => onOpenItemModal()}>Detalles</Button>,
          },
        }));

        setProducts(payload_to_insert);
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
    <>
    <Modal isOpen={isOpenItemModal} onClose={onCloseItemModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del producto</ModalHeader>
          <ModalBody>
            <p>Nombre: </p>
            <p>Precio: </p>
            <p>Cantidad: </p>
            <p>Código de barras: </p>
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
            {salesID ? <QRCode value={salesID.toString()} size={200} /> : null}
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
          <p>Fecha de la venta:</p>
          <p>Código de la venta: {salesID ? salesID : "No creado"}</p>
        </div>
        <div className="text-start text-2xl">
          <h2>Detalles del cliente</h2>
          <p>Nombre:</p>
          <p>Cédula: {params.customer_personal_id}</p>

        </div>
        <div  className="text-start text-2xl">
          <h2>Total:</h2>
          <p>$0.00</p>
        </div>

        <div className="flex flex-col gap-4 text-2xl">
        <h2>Opciones:</h2>
          <Button
            colorScheme="red"
            onClick={(e) => {
              setReloadDataFromServer(!reloadDataFromServer);
            }}
          >
            Cancelar venta
          </Button>
          <Button colorScheme="green">Concretar venta</Button>
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
            {products.map(
              (
                { items: { name, price, barcode_id, quantity, btnAction } },
                index
              ) => (
                <Tr key={index}>
                  <Td>
                    <div className="text-center">{name}</div>
                  </Td>
                  <Td>
                    <div className="text-center">{price}</div>
                  </Td>
                  <Td>
                    <div className="text-center">{quantity}</div>
                  </Td>
                  <Td>
                    <div className="text-center">{barcode_id}</div>
                  </Td>
                  <Td>
                    <div className="text-center">{btnAction}</div>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </section>
    </main>
    </>
  );
}
