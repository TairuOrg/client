'use client'
import Hero from "@/assets/Hero";
import { useEffect, useRef, useState } from "react";
import styles from '@/styles/info.module.css';

export default function Info() {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      
      ([entry]) => {
        console.log("observer", entry)
        setIsInfoVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "50px",
        threshold: 0.5, // trigger when 10% is visible
      }
    );

    if (infoRef.current) {
      observer.observe(infoRef.current);
    }

    return () => {
      if (infoRef.current) {
        observer.unobserve(infoRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.info}>
      <h1>
        Interfaz amigable y fácil de usar <br />
      </h1>
      <div ref={infoRef}>
        <Hero w={800} h={800} visible={isInfoVisible ? styles.visible : ""} />
      </div>
    </section>
  );
}
