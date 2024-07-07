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
  ModalCloseButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  Input,
  ModalContent,
  Button,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";
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
import { settings } from "@/actions/settings";
import { logOut } from "@/actions/auth";
import {
  updateInformation,
  UpdateInformation,
} from "@/schemas/updateInfomation";
import { User } from "@/types";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { update: updateRevenue } = useRevenue();
  const { update: updateCashier } = useCashierStatus();
  const { update: updateItemsAndCategories } = useItemsAndCategories();
  const [userInfo, setUserInfo] = useState<User & { phoneCode: string }>(
    {} as User & { phoneCode: string }
  );

  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    retrieveUserInfo().then((res) => {
      setUserInfo({
        ...res,
        phoneCode: res.phone_number.slice(3, 6),
        phone_number: res.phone_number.slice(6),
      });

    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInformation>({
    resolver: zodResolver(updateInformation),
  });

  const handleSubmitEditProfile = (data: UpdateInformation) => {
    const response = settings({...data, personal_id: userInfo.personal_id});

    response.then(({body: { message }}) => {

      toast({
        title: message.title,
        description: message.description,
        status: message.notificationStatus,
        duration: 9000,
        isClosable: true,
      })

      router.replace("/login")
    })
  };

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
      action: () => {
        logOut().then((res) => {
          console.log(" Se ha salido de sesion");
        });
      },
    },
  };
  return (
    <>
      <Modal isOpen={isOpenSettings} onClose={onCloseSettings}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Editar Perfil</ModalHeader>
          <ModalBody>
            <div>
              <form onSubmit={handleSubmit(handleSubmitEditProfile, (data: any)=> {console.log(data)})}>
                <FormControl className="flex flex-col">
                  <FormLabel>Nombre:</FormLabel>
                  <Input
                    type="text"
                    {...register("fullname")}
                    defaultValue={userInfo.name}
                  />
                  {errors.fullname && (
                    <span className="text-red-500">
                      {" "}
                      {errors.fullname.message}{" "}
                    </span>
                  )}
                  <FormLabel>Cédula</FormLabel>
                  <Input
                    type="text"
                    isDisabled={true}
                    {...register("personal_id", {
                      setValueAs: (v: any) => userInfo.personal_id
                    })}
                    value={userInfo.personal_id}
                  />
                  

                  <FormLabel>Correo Electrónico:</FormLabel>
                  <Input
                    type="text"
                    {...register("email")}
                    defaultValue={userInfo.email}
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      {" "}
                      {errors.email.message}{" "}
                    </span>
                  )}
                  <FormLabel htmlFor="numero-telefonico">
                    Número Telefónico:
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>
                      <Select
                        {...register("phoneCode")}
                        defaultValue={userInfo.phoneCode}
                      >
                        <option value="412">412</option>
                        <option value="416">416</option>
                        <option value="426">426</option>
                        <option value="414">414</option>
                        <option value="424">424</option>
                      </Select>
                    </InputLeftAddon>
                    <Input
                      type="number"
                      {...register("phoneNumber")}
                      defaultValue={userInfo.phone_number}
                    />
                  </InputGroup>
                  {errors.phoneNumber && (
                    <span className="text-red-500">
                      {" "}
                      {errors.phoneNumber.message}{" "}
                    </span>
                  )}
                  <FormLabel>Residencia:</FormLabel>
                  <InputGroup>
                    <Select {...register("state")}>
                      <option value="amazonas">Amazonas</option>
                      <option value="anzoategui">Anzoátegui</option>
                      <option value="apure">Apure</option>
                      <option value="aragua">Aragua</option>
                      <option value="barinas">Barinas</option>
                      <option value="bolivar">Bolívar</option>
                      <option value="carabobo">Carabobo</option>
                      <option value="cojedes">Cojedes</option>
                      <option value="delta_amacuro">Delta Amacuro</option>
                      <option value="distrito_capital">Distrito Capital</option>
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
                  {errors.state && (
                    <span className="text-red-500">
                      {" "}
                      {errors.state.message}{" "}
                    </span>
                  )}

                  <FormLabel>Contraseña:</FormLabel>
                  <Input
                    type="password"
                    {...register("password",)}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {" "}
                      {errors.password.message}{" "}
                    </span>
                  )}
                  <FormLabel>Confirmar Contraseña:</FormLabel>
                  <Input
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      {" "}
                      {errors.confirmPassword.message}{" "}
                    </span>
                  )}
                  <Button type="submit" marginTop="10px" colorScheme="green">
                    Actualizar
                  </Button>
                </FormControl>
              </form>
            </div>
          </ModalBody>
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
