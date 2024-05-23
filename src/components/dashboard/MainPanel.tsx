import { Flex } from "@chakra-ui/react";
import MainPanelHeader from "./MainPanelHeader";
import RevenueChart from "./RevenueChart";
import Revenue from "./Revenues";

export default function MainPanel() {

  return (
    <Flex direction="column" w="100%" minW='700px' h="100%" py={15}>
      <MainPanelHeader />
      <Revenue/>
      <RevenueChart />
    </Flex>
  );
}
