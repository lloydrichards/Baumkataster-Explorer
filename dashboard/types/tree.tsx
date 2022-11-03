import * as t from 'io-ts';

export const TreeType = t.type({
  address: t.union([t.null, t.string]),
  category: t.string,
  crown: t.number,
  genus: t.string,
  geometry: t.string,
  id: t.string,
  name_german: t.string,
  name_lat: t.string,
  quarter: t.string,
  source: t.union([t.null, t.string]),
  species: t.union([t.null, t.string]),
  status: t.string,
  tree_number: t.string,
  type: t.string,
  year: t.union([t.null, t.string]),
});

export type TreeType = t.TypeOf<typeof TreeType>;

export const TreeResultType = t.type({
  id: t.string,
  genus: t.string,
  name_lat: t.string,
  quarter: t.string,
  species: t.union([t.null, t.string]),
});

export type TreeResultType = t.TypeOf<typeof TreeResultType>;
