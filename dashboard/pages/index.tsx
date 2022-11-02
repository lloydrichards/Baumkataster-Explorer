import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';

export default function Home() {
  const router = useRouter();

  const query = router;
  console.log(query);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Lloyd's Baumkataster Explorer</title>
        <meta
          name="description"
          content="A Database Explorer for the Zurich Baumkataster"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopNav />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          backgroundColor: 'red',
          height: '85vh',
          padding: '1rem',
        }}
      >
        <Sidebar />
        <div
          style={{
            flex: 3,
            backgroundColor: 'teal',
            justifyContent: 'center',
          }}
        >
          <h1>Welcome</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
