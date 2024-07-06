"use client";
import {
  Flex,
  HStack,
  Tooltip,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  Input,
  ModalContent,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import { MdOutlineBackup } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import OpenNotification from "./NotificationPanel";
import { useRevenue } from "@/store/useRevenue";
import { retrieveUserInfo } from "@/actions/retrieveUserInfo";
import {
  useCashierStatus,
  useItemsAndCategories,
} from "@/store/useSideMenuReload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function TopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { update: updateRevenue } = useRevenue();
  const { update: updateCashier } = useCashierStatus();
  const { update: updateItemsAndCategories } = useItemsAndCategories();

  interface EditProfileFormData {
    name: string;
    id_type: string;
    personal_id: string;
    email: string;
    phone_code: string;
    phone_number: string;
    residence_location: string;
  }
  
    const { register, setValue } = useForm<EditProfileFormData>();
  
    useEffect(() => {
      retrieveUserInfo("cashier").then((user) => {
        setValue("name", user.name);
        setValue("personal_id", user.personal_id);
        setValue("email", user.email);
        setValue("phone_number",user.phone_number)
        setValue("residence_location", user.residence_location);
      });
    }, [setValue]);

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();
  const buttons = {
    update: {
      icon: <TbReload size={30} />,
      label: "Actualizar",
      action: () => {
        updateRevenue();
        updateCashier();
        updateItemsAndCategories();
      },
    },
    backup: {
      icon: <MdOutlineBackup size={30} />,
      label: "Respaldo",
      action: () => onOpen(),
    },
    settings: {
      icon: <FiSettings size={30} />,
      label: "Configuración",
      action: () => {
        console.log("sdasdsaasd");
        onOpenSettings();
      },
    },
    logout: {
      icon: <FiLogOut size={30} />,
      label: "Cerrar sesión",
      action: () => {},
    },
  };
  return (
    <>

<Modal isOpen={isOpenSettings} onClose={onCloseSettings}>
        <ModalOverlay/>
        <ModalContent>
           <ModalCloseButton />
          <ModalHeader>Editar Perfil</ModalHeader>
          <ModalBody>
            <div>
              <form>
                <FormControl className="flex flex-col">
                  <FormLabel>Nombre:</FormLabel>
                  <Input type="text" {...register("name", { required: true })}/>
                  <FormLabel>Cédula</FormLabel>
                    <Input type="text" isDisabled={true}{...register("personal_id", { required: true })} />
                  <FormLabel>Correo Electrónico:</FormLabel>
                  <Input type="text" {...register("email", { required: true })}/>
                  <FormLabel htmlFor="numero-telefonico">
                      Número Telefónico:
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>
                        <Select>
                          <option value="412">412</option>
                          <option value="416">416</option>
                          <option value="426">426</option>
                          <option value="414">414</option>
                          <option value="424">424</option>
                        </Select>
                      </InputLeftAddon>
                      <Input type="number" {...register("phone_number", { required: true })}/>
                    </InputGroup>
                    <FormLabel>Residencia:</FormLabel>
                  <InputGroup>
                      <Select {...register("residence_location", { required: true })}>
                      <option value="amazonas">Amazonas</option>
                        <option value="anzoategui">Anzoátegui</option>
                        <option value="apure">Apure</option>
                        <option value="aragua">Aragua</option>
                        <option value="barinas">Barinas</option>
                        <option value="bolivar">Bolívar</option>
                        <option value="carabobo">Carabobo</option>
                        <option value="cojedes">Cojedes</option>
                        <option value="delta_amacuro">Delta Amacuro</option>
                        <option value="distrito_capital">
                          Distrito Capital
                        </option>
                        <option value="falcon">Falcón</option>
                        <option value="guarico">Guárico</option>
                        <option value="lara">Lara</option>
                        <option value="merida">Mérida</option>
                        <option value="miranda">Miranda</option>
                        <option value="monagas">Monagas</option>
                        <option value="nueva_esparta">Nueva Esparta</option>
                        <option value="portuguesa">Portuguesa</option>
                        <option value="sucre">Sucre</option>
                        <option value="tachira">Táchira</option>
                        <option value="trujillo">Trujillo</option>
                        <option value="yaracuy">Yaracuy</option>
                        <option value="zulia">Zulia</option>
                      </Select>
                  </InputGroup>
                </FormControl>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" marginTop="10px" colorScheme="green">
              Actualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <OpenNotification isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex dir="row" mt="10" justifyContent={"center"} top={5} w="100%">
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
              p={2}
              boxSizing="content-box"
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
