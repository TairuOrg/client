"use client";
import Logo from "@/assets/Logo";
import styles from "@/styles/customers.module.css";
import { useEffect, useRef, useState } from "react";
export default function CustomersFeedback() {
  const [isCustomerVisible, setIsCustomerVisible] = useState(false);
  const customersRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCustomerVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "50px",
        threshold: 0.5, // trigger when 10% is visible
      }
    );

    if (customersRef.current) {
      observer.observe(customersRef.current);
    }

    return () => {
      if (customersRef.current) {
        observer.unobserve(customersRef.current);
      }
    };
  }, []);
  return (
    <section
      className={`${styles.customers} ${
        isCustomerVisible ? styles.visible : ""
      }`}
      ref={customersRef}
    >
      <h1>
        Nuestros clientes <br />
      </h1>
      <div className={styles.customer_logos}>
        <div>
          <Logo h={100} w={100} />
        </div>
        <div>
          <Logo h={100} w={100} />
        </div>
        <div>
          <Logo h={100} w={100} />
        </div>
        <div>
          <Logo h={100} w={100} />
        </div>
      </div>
    </section>
  );
}
