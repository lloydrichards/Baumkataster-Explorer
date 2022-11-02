// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../config/prisma';

const SearchParam = t.type({
  query: t.string,
  limit: t.number,
  cursor: t.union([t.null, t.string]),
  back: t.boolean,
});
type SearchParam = t.TypeOf<typeof SearchParam>;

type IData = {
  err?: string;
  data: any;
  info?: {
    cursor?: string;
    hasNextPage: boolean;
  };
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<IData>) => {
  await prisma.$connect();

  const resp: IData = await pipe(
    // NOTE: There was an issue here where i forgot to parse the JSON
    SearchParam.decode(JSON.parse(req.body)),
    E.fold(
      async (l) => {
        res.status(500).json({
          err: `Can't parse this: ${req.body.data}`,
          status: 'ERROR',
          data: failure(l),
        });
        throw Error();
      },
      async (r) => {
        const data = await prisma.tree.findMany({
          select: {
            id: true,
            species: true,
            genus: true,
            quarter: true,
            name_lat: true,
          },
          where: {
            name_lat: { contains: r.query },
            OR: {
              quarter: { contains: r.query },
            },
          },
          take: r.limit,
          // cursor: r.cursor ? { id: r.cursor } : undefined,
          // skip: r.cursor ? 1 : undefined,
        });
        console.log(data);
        return {
          data: data,
          info: {
            cursor: data.length == 0 ? undefined : data[data.length - 1].id,
            hasNextPage: data.length == r.limit,
          },
          status: 'OK',
        };
      }
    )
  );

  res.status(200).json(resp);
};

export default handler;
