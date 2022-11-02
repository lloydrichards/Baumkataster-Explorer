import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/layout/DashboardLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const query = router;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        gap: '2rem',
      }}
    >
      <Typography variant="h5" align="center">
        Welcome to the Zurich Baumkataster Explorer 🥳
      </Typography>
      <Typography variant="body1">
        The Baumkataster is a dataset including every tree in Zurich,
        Switzerland. It includes information about when it was planted, its
        location, what type and the species of the tree.
      </Typography>
      <Typography variant="body1">
        To get started you will need to search for a string in the Search Bar
        over there 👈. You can search by the Species, Genus or Quarter that the
        tree resides.
      </Typography>
    </div>
  );
};

export default Home;
Home.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
