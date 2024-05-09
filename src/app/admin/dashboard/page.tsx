import { Flex } from "@chakra-ui/react";

import SideMenu from "@/components/dashboard/SideMenu";
import SummaryPanel from "@/components/dashboard/SummaryPanel";
import Notification from "@/components/dashboard/Notification";

export default function Home() {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      width="100vw"
      overflowY={"auto"}
    >
      {/*Left panel which is sidepanel and menu */}
      <SideMenu />
      {/* Middle panel*/}
      <SummaryPanel />
      {/*Right panel notification*/}
      <Notification />
    </Flex>
  );
}
