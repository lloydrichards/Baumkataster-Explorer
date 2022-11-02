'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SearchBar from '../input/SearchBar';

// async function getProducts() {
//   // getStaticProps
//   const res = await fetch(
//     'https://product-app-101-server.vercel.app/api/products'
//   );
//   return res.json();
// }
const Sidebar = () => {
  const params = useSearchParams();
  const query = params.get('query');

  //   const results = use(getProducts());
  

  console.log({ query });
  //   console.log({ results });

  return (
    <div style={{ flex: 2, backgroundColor: 'salmon', padding: '2rem 1rem' }}>
      Search
      <SearchBar value={query} />
      <Link href={`/details/${'hello'}`}>Click Me</Link>
    </div>
  );
};

export default Sidebar;
