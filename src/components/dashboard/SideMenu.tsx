'use client'
import Logo from "@/assets/Logo";
import {
  Stack,
  Flex,
  Divider,
  HStack,
  Spacer,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { BsBox } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoLogoReact,
} from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";

export default function SideMenu() {
  const isMediumScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: false,
  });
  return (
    <Stack
      direction={{ base: "row", lg: "column" }}
      bgColor="teal.50"
      w={{ base: "100%", lg: "20%" }}
      minH={{ base: "10vh", lg: "100%" }}
      maxH={{ base: "10vh", lg: "100%" }}
      position={"fixed"}
      left={0}
      gap={{ base: 2, lg: 5 }}
      py="20px"
      px="50px"
      alignItems={{ base: "center", lg: "start" }}
    >
      <Flex
        width="100%"
        pt={{ base: 0, lg: "5" }}
        justifyContent="center"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <Logo h={100} w={100} />
      </Flex>

      {isMediumScreen ? null : (
        <Divider
          borderColor="teal.900"
          orientation="horizontal"
          marginTop="20px"
          w="400px"
          maxW="100%"
          mx="auto"
        />
      )}
      <Link
        href="/dashboard"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <HStack>
          <HiOutlineHome size={30} />
          <Text
            hidden={isMediumScreen ? true : false}
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            Principal
          </Text>
        </HStack>
      </Link>
      <Link
        href="/reports"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <HStack>
          <TbReportSearch size={30} />
          <Text
            hidden={isMediumScreen ? true : false}
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            Reportes
          </Text>
        </HStack>
      </Link>

      <Link
        href="/stock"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <HStack>
          <BsBox size={30} />
          <Text
            hidden={isMediumScreen ? true : false}
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            Inventario
          </Text>
        </HStack>
      </Link>
      <Link
        href="/cashier"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <HStack>
          <IoPersonOutline size={30} />
          <Text
            hidden={isMediumScreen ? true : false}
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            Cajeros
          </Text>
        </HStack>
      </Link>

      <Link
        href="/profile"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <HStack>
          <FaRegCircleUser size={30} />
          <Text
            hidden={isMediumScreen ? true : false}
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            Perfil
          </Text>
        </HStack>
      </Link>

      {isMediumScreen ? null : (
        <Divider
          borderColor="teal.900"
          orientation="horizontal"
          marginTop="20px"
          w="400px"
          maxW="100%"
          mx="auto"
        />
      )}

      <Link
        href="/settings"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <HStack>
          <IoSettingsOutline size={30} />
          <Text
            hidden={isMediumScreen ? true : false}
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            Configuración
          </Text>
        </HStack>
      </Link>
      <Link
        href="/logout"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <HStack>
          <CiLogout size={30} />
          <Text
            hidden={isMediumScreen ? true : false}
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            Cerrar Sesión
          </Text>
        </HStack>
      </Link>
      <Spacer />

      {isMediumScreen ? null : (
        <VStack alignItems="center" w="100%">
          <Text
            fontSize={{ base: "2xl", lg: "2xl" }}
            marginLeft="10px"
            cursor="pointer"
          >
            Made with
          </Text>
          <HStack>
            <IoLogoReact size={30} />
            <FaHeart size={30} />
          </HStack>
        </VStack>
      )}
    </Stack>
  );
}
