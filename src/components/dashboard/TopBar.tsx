"use client";
import { Flex, HStack, Tooltip, Text, useDisclosure } from "@chakra-ui/react";
import { FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import OpenNotification from "./NotificationPanel";

export default function TopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttons = {
    notifications: {
      icon: <FiBell size={30} />,
      label: "Notificaciones",
      action: () => onOpen(),
    },
    settings: {
      icon: <FiSettings size={30} />,
      label: "Configuración",
      action: () => {},
    },
    logout: {
      icon: <FiLogOut size={30} />,
      label: "Cerrar sesión",
      action: () => {},
    },
  };
  return (
    <>
      <OpenNotification isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex
        dir="row"
        mt='5'
        justifyContent={"center"}
        top={5}
        w="100%"
      >
        <HStack
          mx="auto"
          spacing="10"
          direction="row"
          px="5"
          fontSize={"lg"}
          bgColor="white"
          borderRadius="20"
          h="65"
          w="fit-content"
          boxShadow={"lg"}
        >
          {Object.entries(buttons).map(([key, { icon, label, action }]) => (
            <Tooltip
              my="5"
              key={key}
              fontSize={"lg"}
              borderRadius="20"
              label={label}
              bgColor="white"
              color="teal.900"
              aria-label="A tooltip"
            >
              <Text
                onClick={action}
                _hover={{ transform: "scale(1.10)" }}
                transition="transform 0.3s ease-in-out"
              >
                {icon}
              </Text>
            </Tooltip>
          ))}
        </HStack>
      </Flex>
    </>
  );
}