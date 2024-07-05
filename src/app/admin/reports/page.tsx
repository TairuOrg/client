"use client";

import { BarChart, Bar, ResponsiveContainer, Legend, XAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { getStatistics } from "@/actions/stats";
import { Statistics } from "@/types";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

export default function ReportsPage() {
  const [statistics, setStatistics] = useState<Statistics>();
  const [reloadFromServer, setReloadFromServer] = useState(false);
  const [kindOfStatistics, setKindOfStatistics] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<string>("Este mes");

  const {
    isOpen: isOpenFilters,
    onOpen: onOpenFilters,
    onClose: onCloseFilters,
  } = useDisclosure();

  const handleOpenFilters = () => {
    onOpenFilters();
    setStatistics(undefined);
    setKindOfStatistics([]);
  };
  return (
    <>
      <Modal isOpen={isOpenFilters} onClose={onCloseFilters}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center">
            Filtros y frecuencia de reportes
          </ModalHeader>

          <ModalBody className="flex flex-col gap-2">
            <h1>Seleccione los tipos de estadísticas</h1>
            <hr />
            <Checkbox
              value={"Top 10 articulos mas vendidos"}
              onChange={(e) =>
                setKindOfStatistics([...kindOfStatistics, e.target.value])
              }
            >
              Top 10 articulos mas vendidos
            </Checkbox>
            <Checkbox
              value={"Top 10 categorias mas vendidas"}
              onChange={(e) =>
                setKindOfStatistics([...kindOfStatistics, e.target.value])
              }
            >
              Top 10 categorias mas vendidas
            </Checkbox>
            <Checkbox
              value={"Ganancia total de ventas"}
              onChange={(e) =>
                setKindOfStatistics([...kindOfStatistics, e.target.value])
              }
            >
              Ganancia total de ventas
            </Checkbox>
            <Checkbox
              value={"Cantidad de Ventas"}
              onChange={(e) =>
                setKindOfStatistics([...kindOfStatistics, e.target.value])
              }
            >
              Cantidad de ventas
            </Checkbox>
            <Checkbox
              value={"Promedio de monto de ventas"}
              onChange={(e) =>
                setKindOfStatistics([...kindOfStatistics, e.target.value])
              }
            >
              Promedio de monto de ventas
            </Checkbox>

            <h1>Seleccione la frecuencia de los datos</h1>
            <hr />
            <Select onChange={(e) => setFrequency(e.target.value)}>
              <option value="Este año">Este año</option>
              <option value="Este mes">Este mes</option>
              <option value="Hoy">Hoy</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => {
                getStatistics({
                  frequency: frequency,
                  statistics: kindOfStatistics,
                }).then(({ body: { payload } }) => {
                  setStatistics(payload);
                  console.log(payload);
                });
                onCloseFilters();
              }}
            >
              Generar reporte
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="flex flex-col justify-center items-start w-full h-full px-10 gap-4 pb-5">
        <Button onClick={handleOpenFilters}>Abrir filtros</Button>
        {statistics?.topTenCategories || statistics?.topTenItems ? (
          <div className="flex gap-4 w-full h-[50%] bg-red-">
            {statistics?.topTenItems && (
              <div className="flex flex-col items-center w-full h-full  pt-4 bg-white shadow-lg rounded-lg">
                <h1>Top artículos más vendidos este mes</h1>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <BarChart
                    data={statistics?.topTenItems}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <Tooltip />
                    <XAxis dataKey="name" />
                    <Bar dataKey={"total_sold"} fill="#38B2AC"></Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            {statistics?.topTenCategories && (
              <div className="flex flex-col items-center w-full h-full pt-4 bg-white shadow-lg rounded-lg">
                <h1>Top categorías más vendidos este mes</h1>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <BarChart data={statistics?.topTenCategories}>
                    <XAxis dataKey="category" />
                    <Tooltip />
                    <Bar dataKey={"total_sold"} fill="#38B2AC"></Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        {statistics?.salesAmount ||
        statistics?.salesTotal ||
        statistics?.salesAverage ? (
          <div className="flex gap-4 w-full h-[50%]">
            {statistics?.salesAmount && (
              <div className="flex flex-col justify-center items-center w-full h-full pt-4 bg-white shadow-lg rounded-xl text-2xl">
                <h1>Ganancia total de ventas</h1>
                <h1>{statistics.salesAmount} USD</h1>
              </div>
            )}
            {statistics?.salesTotal && (
              <div className="flex flex-col justify-center items-center w-full h-full pt-4 bg-white shadow-lg rounded-xl text-2xl">
                <h1>Cantidad de ventas</h1>
                <h1>{statistics.salesTotal}</h1>
              </div>
            )}
            {statistics?.salesAverage && (
              <div className="flex flex-col justify-center items-center w-full h-full pt-4 bg-white shadow-lg rounded-xl text-2xl">
                <h1>Promedio de ventas</h1>
                <h1>{statistics.salesAverage} USD</h1>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {!statistics && (
          <div className="flex flex-col justify-center items-center w-full h-[50%] pt-4 bg-white shadow-lg rounded-xl text-3xl">
            <h1>No hay datos para mostrar</h1>
          </div>
        )}
      </section>
    </>
  );
}
