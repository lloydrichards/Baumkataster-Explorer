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
import { urlBase } from '../../config/api';
import { SearchParam, SearchResult } from '../../types/search';
import { TreeResultType } from '../../types/tree';
import ResultCard from '../card/ResultCard';
import { useDebounce } from '../hooks/useDebunce';

const Sidebar: React.FC = () => {
  const [results, setResults] = useState<TreeResultType[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // NOTE: debounce search typing to minimize api calls
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      const params: SearchParam = {
        query: debouncedSearch,
        limit: 50,
        cursor: null,
        back: false,
      };

      fetch(`${urlBase}/api/search`, {
        body: JSON.stringify(params),
        method: 'POST',
      })
        .then((e) => e.json())
        .then((e) => {
          // [x] Add setResults here
          // console.log(e.data);
          setLoading(false);
          pipe(
            SearchResult.decode(e),
            E.fold(
              (l) => {
                console.error(failure(l));
                // FIXME: deal with error state in ui
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
    <div style={{ flex: 2 }}>
      <Card elevation={8}>
        <CardContent>
          <Typography>Search</Typography>
          <OutlinedInput
            fullWidth
            endAdornment={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Container style={{ minHeight: '70vh' }}>
            // OPTIMIZE: use a pipe to return all states in a cleaner way
            {search == null ? null : loading ? (
              <Container style={{ padding: '1rem' }}>
                <Typography align="center">loading...</Typography>
              </Container>
            ) : results.length == 0 ? (
              <Container style={{ padding: '1rem' }}>
                <Typography align="center">
                  🕵️ We can&apos;t seem to find anything...
                </Typography>
              </Container>
            ) : (
              results.map((r) => <ResultCard key={r.id} data={r} />)
            )}
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
