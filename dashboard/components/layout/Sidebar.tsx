import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, OutlinedInput, Typography } from '@mui/material';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SearchResult, TreeResultType } from '../../types/tree';
import ResultCard from '../card/ResultCard';
import { useDebounce } from '../hooks/useDebunce';

const Sidebar: React.FC = () => {
  const [results, setResults] = useState<TreeResultType[]>([]);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      fetch('http://localhost:3000/api/search', {
        body: JSON.stringify({ query: debouncedSearch }),
        method: 'POST',
      })
        .then((e) => e.json())
        .then((e) => {
          // TODO: Add setResults here
          console.log(e.data);

          pipe(
            SearchResult.decode(e),
            E.fold(
              (l) => {
                console.error(failure(l));
                return null;
              },
              (r) => {
                setResults(r.data);
              }
            )
          );
        });
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
          {results.length == 0
            ? null
            : results.map((r) => <ResultCard key={r.id} data={r} />)}
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
