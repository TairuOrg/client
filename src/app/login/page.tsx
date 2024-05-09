"use client";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ResetPassword from "@/components/login/ResetPassword";
import LogoSection from "@/components/login/LogoSection";
import LoginForm from "@/components/login/loginForm";
import { AuthData } from "@/types";
import { useState } from "react";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, email: evt.target.value });
  };
  const updatePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, password: evt.target.value });
  };
  const [authData, setAuthData] = useState<AuthData>({
    isAdmin: false,
    email: "",
    password: "",
  });
  const handleCheckbox = () => {
    setAuthData({ ...authData, isAdmin: !authData.isAdmin });
  };

  return (
    <>
      <ResetPassword isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      {/* This flex represents the whole page */}
      <Flex
        direction="row"
        backgroundColor="teal.50"
        height="100vh"
        width="100vw"
      >
        <LogoSection handleCheckbox={handleCheckbox} />

        {/* This flex represents the right side of the page  and it stores the form*/}
        <LoginForm
          authData={authData}
          onOpen={onOpen}
          updateEmail={updateEmail}
          updatePassword={updatePassword}
        />
      </Flex>
    </>
  );
}
