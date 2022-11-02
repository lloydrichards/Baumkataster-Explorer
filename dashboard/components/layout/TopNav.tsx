import Link from 'next/link';

const TopNav = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: 'blue',
        padding: '1.5rem',
      }}
    >
      <Link href="/">
        <h2>Baumkataster Explorer</h2>
      </Link>
      <h3>by Lloyd Richards</h3>
    </div>
  );
};

export default TopNav;
