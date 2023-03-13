import styles from './About.module.scss';

const About = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        <h1 className={styles.header}>About Lalasia</h1>

        <h2 className={styles.title}>Marketplacec & IT platform</h2>
        <p className={styles.subtitle}>
          Lalasia is a leading e-commerce platform and one of the largest IT
          companies in the world.
        </p>

        <h2 className={styles.title}>Logistic & delivery</h2>
        <p className={styles.subtitle}>
          Our advanced logistics network is the key to processing hundreds of
          thousands of daily orders – and delivering them quickly – across the
          world.
        </p>

        <h2 className={styles.title}>Enterpreneurship</h2>
        <p className={styles.subtitle}>
          The Lalasia marketplace is a gateway for small and medium enterprises
          to launch and grow their business in world.
        </p>

        <h2 className={styles.title}>Services ecosystem</h2>
        <p className={styles.subtitle}>
          Lalasia is developing a system of services that complement our core
          business, including fintech products under Lalasia Bank, the
          Lalasia.Travel service, and express delivery through Lalasia fresh.
        </p>
      </div>
    </section>
  );
};

export default About;
