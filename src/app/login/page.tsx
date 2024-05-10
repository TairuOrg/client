"use client";
import { Flex} from "@chakra-ui/react";
import SidePanel from "@/components/login/SidePanel";
import LoginForm from "@/components/login/loginForm";
import { useState } from "react";

export default function Page() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCheckbox = () => {
    setIsAdmin(!isAdmin);
  };
  console.log(isAdmin)
  return (
    <>
      {/* This flex represents the whole page */}
      <Flex
        direction="row"
        backgroundColor="teal.50"
        height="100vh"
        width="100vw"
      >
        <Flex direction="row" height="100%" width="100%">
          <SidePanel handleCheckbox={handleCheckbox} />

          {/* This flex represents the right side of the page  and it stores the form*/}
          <LoginForm isAdmin={isAdmin} />
        </Flex>
      </Flex>
    </>
  );
}
