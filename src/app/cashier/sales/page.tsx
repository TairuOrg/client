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

  const path = useSearchParams();
  useEffect(() => {
    console.log(path.get("cashier_id"));
    console.log(path.get("customer_personal_id"));
    setParams({
      cashier_id: parseInt(path.get("cashier_id") as string),
      customer_personal_id: path.get("customer_personal_id") as string,
    });
  }, []);

  const handleCreateSale = () => {
    beginSale(params).then((res) => {
      const {
        body: { payload },
      } = res;
      console.log(payload);
      setSalesID(payload);
    });
  };
  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <section className="flex flex-col justify-center items-center text-center text-teal-800 gap-5">
        {salesID
          ? "Escanea el código QR para continuar con la venta"
          : "Crea una venta para continuar"}
        {salesID ? (
          <div className=" flex flex-col gap-5 bg-white border-2 border-teal-500 p-5 ">
            <QRCode value={salesID.toString()} size={256} />
            El código de la venta es: {salesID}
          </div>
        ) : null}
        <Button onClick={handleCreateSale} size={"lg"}>
          {" "}
          Crear venta
        </Button>
        
      </section>
    </main>
  );
}
