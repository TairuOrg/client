"use client";

import { ChakraProvider } from "@chakra-ui/react";

export function UIProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
