import type { Metadata } from "next";
import { Abril_Fatface, Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "./providers";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "700",
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
      <body className={`${inter.className}`}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
