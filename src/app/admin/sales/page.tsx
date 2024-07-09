"use client";

import { getSales } from "@/actions/sales";
import { Sale } from "@/types";
import { Badge, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function SalesPage() {
    const [data, setData] = useState<Sale[]>([])
    useEffect(()=> {
        getSales().then(e => {
            setData(e)
          })
    })
    const col = [
        {
          header: "ID venta",
          id: "sale_id",
        },
        {
          header: "ID cajero",
          id: "cashier_id",
        },
        {
          header: "ID cliente",
          id: "customer_id",
        },
        {
          header: "Fecha",
          id: "date",
        },
        {
          header: "Estado de la venta",
          id: "sale_status",
        },
      ];
    
  return (
    <div className="flex flex-col justify-items items-center w-full p-[100px] min-h-fit max-h-[800px] gap-4">
        <section className="border-teal-700 border-[2px] p-4 rounded-lg w-full h-full overflow-y-scroll">
      <Table variant="striped" size="lg" borderColor="teal.500" overflowY={'scroll'}>
        <Thead>
          <Tr>
            {col.map((column, index) => (
              <Th textAlign="center" key={index}>
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody overflowY={'scroll'}>
          {data?.map((sale, index) => (
            <Tr
              key={index}
              textAlign="center"
              p={4}
              fontSize="lg"
            >
              <Td>
                <div className={"text-center"}>{sale.id}</div>
              </Td>
              <Td>
                <div className="text-center">{sale.cashier_id}</div>
              </Td>
              <Td>
                <div className="text-center">{sale.customer_id}</div>
              </Td>
              <Td>
                <div className="text-center">
                  {sale.date.split('T')[0]}
                </div>
              </Td>
              <Td >
                <div className="text-center">
                    <Badge size="lg" colorScheme={sale.is_completed? "green" : "yellow"}> 
                        {sale.is_completed ? "Completada" : "En progreso"}
                    </Badge> 
              </div>
              </Td>
            </Tr>
          ))}
          {data.length === 0 && (
              <Tr>
                <Td colSpan={5}>
                  <div className="text-3xl flex gap-4 justify-center h-full"><Spinner size={'lg'}/> Cargando resultados</div>
                </Td>
              </Tr>
            )}
        </Tbody>
      </Table>
      </section>
    </div>
  );
}
