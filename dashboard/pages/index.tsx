import { useRouter } from 'next/router';
import DashboardLayout from '../components/layout/DashboardLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const query = router;
  return <div style={{ display: 'flex', flexDirection: 'column' }}>Hello</div>;
}

export default Home;
Home.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
