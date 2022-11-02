import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <body>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
