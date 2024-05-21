import { Flex } from "@chakra-ui/react";
import MainPanelHeader from "./MainPanelHeader";
import Revenue from "./Revenues";
import RecentlyStats from "./Stats";

export default function MainPanel() {

  return (
    <Flex direction="column" w="100%" h="100%">
      <MainPanelHeader />
      <Revenue />
      <RecentlyStats />
    </Flex>
  );
}
