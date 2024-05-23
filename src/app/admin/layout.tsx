import TopBar from "@/components/dashboard/TopBar";
import Menu from "@/components/dashboard/Menu";
import { Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tairu - Administrator 💻",
  description: "Administra tu negocio con Tairu",
};

export default function RootLayout({
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
