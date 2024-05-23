import Menu from "@/components/dashboard/Menu";
import TopBar from "@/components/dashboard/TopBar";
import {Flex } from "@chakra-ui/react";
import MainPanel from "@/components/dashboard/MainPanel";
import SideMenu from "@/components/dashboard/SideMenu";


export default function Home() {
  return (
    <>
      <MainPanel />
      <SideMenu />
    </>
  );
}
