import type { Metadata } from "next";
import { Abril_Fatface } from "next/font/google";
import "./globals.css";
import { UIProvider } from "./providers";

const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Tairu",
  description: "Administra tu negocio con Tairu",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${abril.className}`}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
