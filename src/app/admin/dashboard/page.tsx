import Menu from "@/components/dashboard/Menu";
import TopBar from "@/components/dashboard/TopBar";
import {Flex } from "@chakra-ui/react";
import MainPanel from "@/components/dashboard/MainPanel";
import SideMenu from "@/components/dashboard/SideMenu";


export default function Home() {
  return (
    <Flex
      direction={"column"}
      height="100vh"
      width="100vw"
      overflowY={"auto"}
      bgColor="teal.50"
    >
      <TopBar />
      <Flex direction="row" flex="1">
        <Menu />
        <MainPanel />
        <SideMenu />
      </Flex>
    </Flex>
  );
}
