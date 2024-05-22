import { Flex } from "@chakra-ui/react";
import MainPanelHeader from "./MainPanelHeader";
import Revenue from "./Revenues";
import RevenueChart from "./RevenueChart";

export default function MainPanel() {

  return (
    <Flex direction="column" w="100%" h="100%" py={15}>
      <MainPanelHeader />
      <Revenue />
      <RevenueChart />
    </Flex>
  );
}
