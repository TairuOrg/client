import Header from "@/components/about-us/Header";
import { Flex } from "@chakra-ui/react";
import Navbar from "@/components/ui/Navbar";

export default function Page() {
  return (
    <Flex flexDirection='column'> 
        <Navbar />
        <Header title="holaaaaaa bienvenido"/>
    </Flex>
      
  );
}
