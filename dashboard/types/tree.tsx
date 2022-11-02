import * as t from 'io-ts';

const TreeType = t.type({
  address: t.string,
  category: t.string,
  crown: t.number,
  genus: t.string,
  geometry: t.string,
  id: t.string,
  name_german: t.string,
  name_lat: t.string,
  quarter: t.string,
  source: t.string,
  species: t.string,
  status: t.string,
  tree_number: t.string,
  type: t.string,
  year: t.string,
});
