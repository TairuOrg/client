'use client'
import { Box, Link, Tooltip, VStack } from "@chakra-ui/react";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineDocument } from "react-icons/hi";
import { FiBox } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();
  console.log(pathname)

  const paths = {
    "/admin/dashboard": { label: "Principal", icon: <RiHome2Line size={40} /> },
    "/admin/reports": {
      label: "Reportes",
      icon: <HiOutlineDocument size={40} />,
    },
    "/admin/stock": { label: "Inventario", icon: <FiBox size={40} /> },
    "/admin/cashier": { label: "Cajeros", icon: <FiUser size={40} /> },
  };
  return (
    <VStack width={"92px"} ml='10' height={"100%"}left='5'>
      <VStack
        my='auto' 
        boxShadow={"lg"}
        borderRadius="30"
        w="92px"
        bgColor='white'
        minH='fit-content'
        h='50%'
       
      >
        <Box m={"auto"} minH='fit-content'>
          <VStack spacing={10} minH='fit-content'>
            {Object.entries(paths).map(([path, { label, icon }]) => (
              <Tooltip
                key={path}
                placement="right"
                mx='5'
                fontSize={"lg"}
                label={label}
                bgColor="white"
                borderRadius='20'
                color="teal.900"
                aria-label="A tooltip"
              >
                <Link
                  boxSizing="content-box"
                  padding='2'
                  href={path}
                  borderRadius='lg'
                  bgColor= { pathname === path ? 'teal.100' : 'transparent'}
                  _hover={{ transform: "scale(1.10)" }}
                  transition="transform 0.3s ease-in-out"
                >
                  {icon}
                </Link>
              </Tooltip>
            ))}
          </VStack>
        </Box>
      </VStack>
    </VStack>
  );
}
