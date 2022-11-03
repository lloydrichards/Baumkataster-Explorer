// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../config/prisma';
import { SearchParam } from '../../types/search';

// TODO: change to union of success and failure
type IData = {
  err?: string;
  // NOTE: intentionally set data to any so I could show how to safely type on frontend
  data: any;
  // TODO: This was supposed to be used for pagination, but never implemented
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
        // HACK: this does not give any feedback on the error and should be improved
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
          // TODO: improve how FullText search works, still a little buggy
          // TODO: add additional filters for quarter, type, status
          where: {
            OR: [
              {
                name_lat: {
                  search: r.query,
                },
              },
              {
                quarter: {
                  search: r.query,
                },
              },
              {
                id: {
                  contains: r.query,
                },
              },
            ],
          },
          take: r.limit,
          // TODO: this would have been used for pagination
          // cursor: r.cursor ? { id: r.cursor } : undefined,
          // skip: r.cursor ? 1 : undefined,
        });
        // console.log(data);
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
