import * as t from 'io-ts';
import { TreeResultType } from './tree';

export const SearchResult = t.type({
    data: t.array(TreeResultType),
  });
  export type SearchResult = t.TypeOf<typeof SearchResult>;