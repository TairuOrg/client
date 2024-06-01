import type { Metadata } from "next";
import { Abril_Fatface, Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "./providers";

const abril = Abril_Fatface({
  subsets: ["latin"],
  variable: '--font-abril',
  weight: "400"
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
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
