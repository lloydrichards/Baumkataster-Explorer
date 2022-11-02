import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, OutlinedInput, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebunce';

const Sidebar: React.FC = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      fetch('http://localhost:3000/api/search', {
        body: JSON.stringify({ query: debouncedSearch }),
        method: 'POST',
      })
        .then((e) => e.json())
        .then((e) => console.log(e));
    }
  }, [debouncedSearch]);

  return (
    <div style={{ flex: 2, backgroundColor: 'salmon' }}>
      Search
      <Card>
        <CardContent>
          <Typography>Search</Typography>
          <OutlinedInput
            fullWidth
            endAdornment={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href={`/details/${'hello'}`}>Click Me</Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
