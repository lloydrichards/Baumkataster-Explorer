import * as t from 'io-ts';
import { TreeResultType } from './tree';

export const DetailResult = t.type({
  data: t.union([TreeResultType, t.null]),
});
export type DetailResult = t.TypeOf<typeof DetailResult>;
