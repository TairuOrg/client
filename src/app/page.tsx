import "@/styles/landing.css";

import Heading from "@/components/landing/Title";
import Navbar from "@/components/landing/Navbar";
import Info from "@/components/landing/Information";
import CustomersFeedback from "@/components/landing/Customers";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <Heading />
      <Info />
      <CustomersFeedback />
      <Footer />
    </main>
  );
}
