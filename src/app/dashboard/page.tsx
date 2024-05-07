"use client";
import Card from "@/components/dashboard/Card";
import IncomingBalance from "@/components/dashboard/IncomingBalance";
import Summmary from "@/components/dashboard/Summary";

import {
  Flex,
  VStack,
  Heading,
  Box,
  useBreakpointValue,
  Divider,
  HStack,
  Link,
  Text,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useCashierStore } from "@/store/useCashier";
import { useStockStore } from "@/store/useStock";
import Logo from "@/assets/Logo";
import { BsBox } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { IoSettingsOutline, IoLogoReact } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";

export default function Home() {
  const isMediumScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: false,
  });
  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });

  const cashier = useCashierStore((state) => state);
  const stock = useStockStore((state) => state);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      width="100vw"
      overflowY={"auto"}
    >
      {/*Left panel which is sidepanel and menu */}
      <Stack
        direction={{ base: "row", lg: "column" }}
        bgColor="teal.50"
        w={{ base: "100%", lg: "20%" }}
        minH={{ base: "10vh", lg: "100%" }}
        maxH={{ base: "10vh", lg: "100%" }}
        position={"fixed"}
        left={0}
        gap={{ base: 2, lg: 5 }}
        px="60px"
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
            <BsBox size={30} />
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

      {/* Middle panel*/}
      <Flex
        direction={"column"}
        w={{ base: "100%", lg: "70%" }}
        gap={8}
        py={{ base: "10vh", lg: "0%" }}
        pl={{ base: "0%", lg: "20%" }}
      >
        <Box p="4" display="flex" h="auto">
          <Heading fontWeight="regular">Hola!,[usuario] Bienvenido</Heading>
        </Box>

        <Card w={"80%"}>
          <IncomingBalance />
        </Card>

        <Card w={"50%"}>
          {/**
           * Read the Summary component
           */}
          <Summmary
            type={"cashier_stats"}
            data={cashier}
            reloadContent={cashier.updateCashierStatus}
          />
        </Card>

        <Card w={"50%"}>
          <Summmary
            type={"stock_stats"}
            data={stock}
            reloadContent={stock.updateStockStatus}
          />
        </Card>
      </Flex>
      {!isMediumScreen && (
        <Flex w="30%" bg="peru">
          {/* Flex content */}
        </Flex>
      )}
    </Flex>
  );
}
