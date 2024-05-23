"use client";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuCopyCheck } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { IoReload } from "react-icons/io5";
import { useNotificationStore } from "@/store/useNotification";
import { NotificationStore } from "@/types";
import formatDate from "@/utils/formatDate";
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
  }, [isReloaded]);

  return (
    <VStack spacing='4' w='100%'> 
      <Suspense fallback={<CardSkeleton />}>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        : store.notifications.length > 0 &&
          store.notifications.map((notification) =>
            notification.isIgnored ? null : (
              <Card
                gap="1"
                w="100%"
                key={notification.id}
                bg={notification.isRead ? "teal.50" : "transparent"}
              >
                <HStack alignItems="center" w="100%">
                  <Text>
                    <strong>Fecha:</strong> {formatDate(notification.date)}
                  </Text>
                  <Spacer />
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
                  <Text whiteSpace={"pre-line"}>
                    <strong>Mensaje:</strong> {"\n"}
                    {notification.description}
                  </Text>
                </VStack>
              </Card>
            )
          )}
    </Suspense>

    </VStack>

  );
}
