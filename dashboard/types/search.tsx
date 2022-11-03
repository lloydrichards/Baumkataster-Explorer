import * as t from 'io-ts';
import { TreeResultType } from './tree';

export const SearchResult = t.type({
  data: t.array(TreeResultType),
});
export type SearchResult = t.TypeOf<typeof SearchResult>;

export const SearchParam = t.type({
  queryTree: t.string,
  queryAddress: t.string,
  limit: t.number,
  cursor: t.union([t.null, t.string]),
  back: t.boolean,
});
export type SearchParam = t.TypeOf<typeof SearchParam>;
