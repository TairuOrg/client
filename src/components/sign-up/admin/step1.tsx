import React from 'react';
import styles from "@/styles/signup.module.css";
import { AiOutlineUser } from "react-icons/ai";

export default function Step1(){
 
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-teal-100">
         <div className={styles.stepperContainer}>
          <section className={styles.secondContainer}>
              <h1 className={styles.title}>
                <AiOutlineUser className={styles.icon}/> Registro
              </h1>
              <h2 className={styles.subtitle}>Administrador</h2>
              <label className={styles.label}>Clave de acceso</label>
              <input type="text" className={styles.input} placeholder="HGY8KL9"/>
              <button className={styles.button}>Validar</button>
            </section>
          </div>
        </div>

    );

}