import TopBar from "@/components/dashboard/TopBar";
import Menu from "@/components/dashboard/Menu";
import { Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
export const metadata: Metadata = {
  title: "Tairu - Administrator 💻",
  description: "Administra tu negocio con Tairu",
};
const inter = Inter({ subsets: ["latin"] });
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Flex
        direction={"column"}
        height="100vh"
        width="100vw"
        overflowY={"auto"}
        bgColor="teal.50"
        className={inter.className}
      >
        <TopBar />
        <Flex dir="row" flex="1">
          <Menu />
          {children}
        </Flex>
      </Flex>
    </>
  );
}
