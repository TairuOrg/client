import Logo from "@/assets/Logo";

export default function CustomersFeedback() {
  return (
    <section className="customers">
      <h1>
        Nuestros clientes <br />
      </h1>
      <div className="customer-logos">
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
