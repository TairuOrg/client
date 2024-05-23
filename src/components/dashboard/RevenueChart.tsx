"use client";
import React, { useState } from "react";
import { Box, Flex, Heading, Switch } from "@chakra-ui/react";
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


const data = [
  { name: "Lunes", actual: 4000, "semana previa": 2400 },
  { name: "Martes", actual: 3000, "semana previa": 1398 },
  { name: "Miércoles", actual: 2000, "semana previa": 9800 },
  { name: "Jueves", actual: 2780, "semana previa": 3908 },
  { name: "Viernes", "semana previa": 4800 },
  { name: "Sábado", "semana previa": 3800 },
  { name: "Domingo", "semana previa": 4300 },
];

const RevenueChart = () => {
  const [showPreviusWeek, setShowPreviusWeek] = useState(false);
  const handleToggle = () => setShowPreviusWeek(!showPreviusWeek);
  return (
    <Box
      mx="10"
      bgColor="white"
      borderRadius="30"
      maxW="100%"
      minW="fit-content"
      minH="fit-content"
      maxH="50%"
      px={4}
      py={2}
      boxShadow="lg"
    >
      <Flex dir="row" justifyContent={"center"} alignItems={"center"}>
        <Heading fontSize={"xl"}>
          Mostrar semana previa{" "}
          <Switch size="md" onChange={() => handleToggle()} />
        </Heading>
      </Flex>
      <ResponsiveContainer width={"100%"} height={"95%"}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke="#8884d8" />
          {showPreviusWeek && (
            <Line type="monotone" dataKey="semana previa" stroke="#82ca9d" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;
