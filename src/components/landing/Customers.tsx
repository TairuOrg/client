import Logo from "@/assets/Logo";
import styles from '@/styles/customers.module.css'
export default function CustomersFeedback() {
  return (
    <section className={styles.customers}>
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
