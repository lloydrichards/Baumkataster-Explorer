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
      {/* BUG: This is causing an error about spreading the styles? */}
      {/* <Head>
        <title>Lloyd's Baumkataster Explorer</title>
        <meta
          name="description"
          content="A Database Explorer for the Zurich Baumkataster"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <TopNav />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          backgroundColor: 'red',
          minHeight: '85vh',
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
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
