import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  OutlinedInput,
  Typography,
} from '@mui/material';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';
import { useEffect, useState } from 'react';
import { SearchResult } from '../../types/search';
import { TreeResultType } from '../../types/tree';
import ResultCard from '../card/ResultCard';
import { useDebounce } from '../hooks/useDebunce';

const Sidebar: React.FC = () => {
  const [results, setResults] = useState<TreeResultType[]>([]);
  const [search, setSearch] = useState('');
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      fetch('http://localhost:3000/api/search', {
        body: JSON.stringify({
          query: debouncedSearch,
          limit: 50,
          cursor: null,
          back: false,
        }),
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
      <Card>
        <CardContent>
          <Typography>Search</Typography>
          <OutlinedInput
            fullWidth
            endAdornment={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Container style={{ minHeight: '70vh' }}>
            {results.length == 0
              ? null
              : results.map((r) => <ResultCard key={r.id} data={r} />)}
          </Container>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button>Previous Page</Button>
            <Box />
            <Button>Next Page</Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
