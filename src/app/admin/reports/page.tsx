"use client";

import { BarChart, Bar, ResponsiveContainer, Legend, XAxis } from "recharts";
import { useState, useEffect } from "react";
import { getTopTenArticles } from "@/actions/stats";
import { Statistics } from "@/types";

export default function ReportsPage() {
  const [topTenArticles, setTopTenArticles] = useState<Statistics>();

  useEffect(() => {
    (async () => {
      const {
        body: { payload },
      } = await getTopTenArticles({
        frequency: "Este mes",
        statistics: [
          "Top 10 articulos mas vendidos",
          "Top 10 categorias mas vendidas",
        ],
      });
      
      setTopTenArticles(payload);
    })();
  }, []);
  return (
    <section className=" flex justify-center items-center w-full h-full px-10 gap-4">
      <div className="flex flex-col items-center w-[50%] h-[50%] pt-4 bg-white shadow-lg rounded-lg">
        <h1>Top artículos más vendidos este mes</h1>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart
            data={topTenArticles?.topTenItems}
            margin={{
              top: 5,
              right: 10,
              left: 5,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />

            <Bar dataKey={"total_sold"} fill="#38B2AC"></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-center w-[50%] h-[50%] pt-4 bg-white shadow-lg rounded-lg">
        <h1>Top categorías más vendidos este mes</h1>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={topTenArticles?.topTenCategories}>
            <XAxis dataKey="category" />

            <Bar dataKey={"total_sold"} fill="#38B2AC"></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
