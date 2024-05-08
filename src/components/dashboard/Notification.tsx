import { RiDeleteBin2Line } from "react-icons/ri";
import { LuCopyCheck } from "react-icons/lu";
import { IoReload } from "react-icons/io5";
import { useNotificationStore } from "@/store/useNotification";
import { NotificationStore} from "@/types";
import {
  VStack,
  Text,
  Heading,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Card from "./Card";
import { useEffect, useState } from "react";

export default function Notification() {
  const store: NotificationStore = useNotificationStore((state) => state);
  const [isReloaded, setIsReloaded] = useState(false);

  useEffect(() => {
    store.updateNotifications();
    console.log("reloadddd");
  }, [isReloaded]);

  return (
    <VStack direction="column" w="30%">
      {/* Flex content */}
      <VStack
        py={4}
        gap={4}
        minW="400px"
        maxW="80%"
        minH="600px"
        maxH="80%"
        borderWidth={"4px"}
        m="auto"
        rounded="15"
        alignItems="center"
      >
        <VStack overflow={"auto"}>
          <HStack w="100%" justify={"center"} gap="10">
            <Heading>Notificaciones</Heading>
            <Button bg="transparent" onClick={() => setIsReloaded(!isReloaded)}>
              <IoReload size={25} />
            </Button>
          </HStack>
          {store.notifications.length > 0 &&
            store.notifications.map((notification) =>
              notification.isIgnored ? null : (
                <Card
                  w="100%"
                  key={notification.id}
                  bg={notification.isRead ? "teal.50" : "transparent"}
                >
                  <VStack>
                    <Text>Fecha: {notification.date.toString()}</Text>
                    <Text> Mensaje: {notification.description}</Text>
                  </VStack>
                </Card>
              )
            )}
        </VStack>
        <Spacer />
        <Heading>eliminar</Heading>
      </VStack>
    </VStack>
  );
}
