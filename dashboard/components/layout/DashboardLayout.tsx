import { Card, Grid, Paper } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export interface ILayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const DashboardLayout: React.FC<ILayout> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopNav />
      <Paper
        square
        elevation={0}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          minHeight: '85vh',
          padding: '1rem',
        }}
      >
        <Sidebar />
        <Card
          elevation={8}
          style={{
            flex: 3,
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '79vh' }}
          >
            <Grid item xs={3}>
              {children}
            </Grid>
          </Grid>
        </Card>
      </Paper>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
