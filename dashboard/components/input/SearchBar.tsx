'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface ISearchBar {
  value: string | null;
}

const SearchBar: React.FC<ISearchBar> = ({ value }) => {
  const router = useRouter();
  const [search, setSearch] = useState(value || '');
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/?search=${search}`);
        }}
      >
        <input
          type="text"
          className="rounded-full border-2 w-5/6 sm:w-128 h-12 px-3"
          value={search || undefined}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
