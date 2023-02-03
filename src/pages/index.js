import Head from 'next/head';
import styles from 'styles/Home.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
