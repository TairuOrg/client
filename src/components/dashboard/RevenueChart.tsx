"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Switch } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { retrieveDashboardChartData } from "@/actions/revenues";
import { ChartDataPerDay, DashboardChartData } from "@/types";

const RevenueChart = () => {
  const [showPreviousWeek, setShowPreviusWeek] = useState(false);
  const handleToggle = () => setShowPreviusWeek(!showPreviousWeek);
  const [data, setData] = useState<ChartDataPerDay[]>();
  const [loadChartDataFromServer, setloadChartDataFromServer] = useState(true);
  useEffect(() => {
    (async () => {
      const {
        body: { payload },
      } = await retrieveDashboardChartData();
      const data_to_display = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ].map((day, index) => {
        return {
          name: day,
          actual: payload.thisWeekSales[index],
          "semana previa": payload.pastWeekSales[index],
        };
      });
      setData(data_to_display);
    })();
  }, [loadChartDataFromServer]);

  return (
    <Box
      mx="10"
      bgColor="white"
      borderRadius="30"
      maxW="100%"
      minW="fit-content"
      minH="fit-content"
      maxH="60%"
      px={4}
      py={2}
      boxShadow="lg"
    >
      <Flex dir="row" justifyContent={"center"} alignItems={"center"} gap={4}>
          Mostrar semana previa{" "}
          <Switch size="md" onChange={() => handleToggle()} />
          <Button
            onClick={(e) => {
              setloadChartDataFromServer(!loadChartDataFromServer);
            }}
          >
            Recargar datos
          </Button>
        
      </Flex>
      <ResponsiveContainer width={"95%"} height={"95%"}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke="#8884d8" />
          {showPreviousWeek && (
            <Line type="monotone" dataKey="semana previa" stroke="#82ca9d" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;
