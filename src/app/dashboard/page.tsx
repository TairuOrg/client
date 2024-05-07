"use client";
import Card from "@/components/dashboard/Card";
import IncomingBalance from "@/components/dashboard/IncomingBalance";
import Summmary from "@/components/dashboard/Summary";

import { useCashierStore } from "@/store/useCashier";
import { useStockStore } from "@/store/useStock";
import { HiOutlineHome } from "react-icons/hi2";
import { TbReportSearch } from "react-icons/tb";
import { BsBox } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline, IoLogoReact } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";



export default function Home() {
  const isMediumScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: false,
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
      <VStack
        bgColor="teal.50"
        width="20%"
        minW="400px"
        height="100%"
        minH="100vh"
        gap={6}
        px={"80px"}
        alignItems={"flex-start"}
      >
        <Flex width="100%"paddingTop= "30px" justifyContent="center">
          <Logo h={100} w={100} />
          
        </Flex>

        <Divider
        borderColor='teal.900' 
        orientation="horizontal" 
        marginTop="20px"
        />
          <Link href="/principal">
              <HStack>
              <HiOutlineHome size={25}/>
                <Text>
                  
                  Principal
                </Text>
              </HStack>

          </Link>
          <Link href="/generar-reporte">
              <HStack>
              <TbReportSearch size={25} />
                <Text>
                  Generar Reporte
                </Text>
              </HStack>

          </Link>
      
          <Link href="/inventario">
              <HStack>
              <BsBox size={25} />
                <Text>
                  Inventario
                </Text>
              </HStack>

          </Link>
          
          <Link href="/perfil">
              <HStack>
              <FaRegCircleUser size={25} />
                <Text>
                  Perfil
                </Text>
              </HStack>

          </Link>
      

          <Divider
            borderColor='teal.900' 
            orientation="horizontal" 
            marginTop="20px"
          />
          <Link href="/configuración">
              <HStack>
              <IoSettingsOutline size={25} />
                <Text>
                  Configuración
                </Text>
              </HStack>

          </Link>
          <Link href="/cerrar-sesión">
              <HStack>
              <CiLogout size={25} />
                <Text>
                  Cerrar Sesión
                </Text>
              </HStack>

          </Link>
          
          <Divider
            borderColor='teal.900' 
            orientation="horizontal" 
            marginTop="20px"
          />

        <VStack alignItems='center' w='100%'>
          <Text fontSize="lg" marginLeft="10px" cursor="pointer">Made with</Text>
          <HStack>
            <IoLogoReact size={25} />
            <FaHeart size={25} />
          </HStack>
        </VStack>


        w={{ base: "100%", lg: "20%" }}
        h={{ base: "10vh", lg: "100%" }}
        position={"fixed"}
        left={0}
        
      >
        <Heading>Left sidebar</Heading>


      </VStack>

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
