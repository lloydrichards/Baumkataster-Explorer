import { Paper, Typography } from '@mui/material';
import Link from 'next/link';

const TopNav = () => {
  return (
    <Paper
      elevation={4}
      square
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        flexDirection: 'row',
        padding: '1.5rem',
      }}
    >
      <Link href="/">
        <Typography variant="h4">Baumkataster Explorer</Typography>
      </Link>
      <Typography variant="subtitle1">Lloyd Richards</Typography>
    </Paper>
  );
};

export default TopNav;
