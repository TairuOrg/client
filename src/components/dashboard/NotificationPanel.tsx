import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Heading,
  ModalFooter,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Notification from "./Notification";
type OpenNotificationProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function OpenNotification({
  isOpen,
  onClose,
}: OpenNotificationProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
        <ModalOverlay />
        <ModalContent
          position="fixed"
          right="10"
          width="90vw"
          height="80vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
        >
          <ModalBody overflow={"auto"} px="10">
            <ModalHeader
              flexDirection="row"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Heading fontSize={"2xl"} textAlign={"center"}>
                Notificaciones
              </Heading>
            </ModalHeader>

            <Notification />

            <ModalFooter>
              <Button bgColor="transparent">Recargar</Button>
              <Spacer />
              <Button bgColor="transparent"> Eliminar </Button>
            </ModalFooter>
            <ModalCloseButton />

            {/* <Notification /> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
