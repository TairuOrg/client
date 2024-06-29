"use client";

import { beginSale } from "@/actions/cashier/sales";
import { Button } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
export default function Page() {
  const [params, setParams] = useState({
    cashier_id: 0,
    customer_personal_id: "",
  });
  const [salesID, setSalesID] = useState<number | null>(null);
  const [createSalePressed, setCreateSalePressed] = useState(false);

  const path = useSearchParams();
  useEffect(() => {
    setParams({
      cashier_id: parseInt(path.get("cashier_id") as string),
      customer_personal_id: path.get("customer_personal_id") as string,
    });
  }, []);

  const handleCreateSale = () => {
    beginSale(params).then((res) => {
      setCreateSalePressed(true);
      const {
        body: { payload },
      } = res;
      console.log(payload);
      setSalesID(payload);
    });
  };
  return (
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
              Crear venta
            </Button>
          </div>
        </section>

        <div className="text-start text-2xl">
          <h2>Detalles de la venta:</h2>
          <p>Cajero: {params.cashier_id}</p>
          <p>Cliente: {params.customer_personal_id}</p>
          <p>Venta: {salesID ? salesID : "No se ha creado la venta"}</p>
        </div>

        <div className="flex gap-4 text-2xl items-center ">
          <h2>Opciones:</h2>
          <span className="flex flex-col gap-4">
            <Button colorScheme="red">Cancelar venta</Button>
            <Button colorScheme="green">Finalizar venta</Button>
          </span>
        </div>
      </section>
    </main>
  );
}
