'use client'
import Hero from "@/assets/Hero";
import { useEffect, useRef, useState } from "react";

export default function Info() {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInfoVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "50px",
        threshold: 0.1, // trigger when 10% is visible
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
    <section className="info">
      <h1>
        Interfaz amigable y fácil de usar <br />
      </h1>
      <div ref={infoRef}>
        <Hero w={800} h={800} visible={isInfoVisible ? "visible" : ""} />
      </div>
    </section>
  );
}
