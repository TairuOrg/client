"use client";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuCopyCheck } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { IoReload } from "react-icons/io5";
import { useNotificationStore } from "@/store/useNotification";
import { NotificationStore } from "@/types";
import {
  VStack,
  Text,
  Heading,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Card from "./Card";
import { Suspense, useEffect, useState } from "react";
import CardSkeleton from "../ui/CardSkeleton";

export default function Notification() {
  const store: NotificationStore = useNotificationStore((state) => state);
  const [isReloaded, setIsReloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Step 1: Add loading state

  useEffect(() => {
    store.updateNotifications().then(() => setIsLoading(false)); // Step 6: Update loading state once notifications are loaded
    console.log("reloadddd");
  }, [isReloaded]);

  return (
    <VStack direction="column" w="30%">
      <VStack
        py={4}
        gap={4}
        minW="500px"
        maxW="80%"
        minH="600px"
        maxH="80%"
        borderWidth={"4px"}
        borderColor={"gray.200"}
        m="auto"
        rounded="15"
        alignItems="center"
      >
        <VStack overflow={"auto"} w="100%">
          <HStack w="100%" justify={"center"} gap="10">
            <Heading>Notificaciones</Heading>
            <Button bg="transparent" onClick={() => setIsReloaded(!isReloaded)}>
              <IoReload size={25} />
            </Button>
          </HStack>

          <Suspense fallback={<CardSkeleton />}>
            {isLoading
              ? Array.from({ length: 20 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : store.notifications.length > 0 &&
                store.notifications.map((notification) =>
                  notification.isIgnored ? null : (
                    <Card
                      w="100%"
                      key={notification.id}
                      bg={notification.isRead ? "teal.50" : "transparent"}
                    >
                      <HStack alignItems="center">
                        <Text>
                          <strong>Fecha:</strong> {notification.date.toString()}
                        </Text>
                        <Button
                          bg="transparent"
                          onClick={() => store.MarkAsRead(notification.id)}
                        >
                          {notification.isRead ? (
                            <LuCopyCheck size={25} />
                          ) : (
                            <LuCopy size={25} />
                          )}
                        </Button>
                      </HStack>
                      <VStack>
                        <Text>
                          <strong>Mensaje:</strong> {notification.description}
                        </Text>
                      </VStack>
                    </Card>
                  )
                )}
          </Suspense>
        </VStack>
        <Spacer />
        <HStack alignItems="flex-start" mr="80" h={"40px"}>
          <Button bg="transparent" onClick={() => store.MarkAsIgnored()}>
            <MdOutlineDeleteOutline size={35} />
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
