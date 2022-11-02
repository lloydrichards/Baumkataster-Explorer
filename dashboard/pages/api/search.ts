// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../config/prisma';

const SearchParam = t.type({
  query: t.string,
});
type SearchParam = t.TypeOf<typeof SearchParam>;

type IData = {
  err?: string;
  data: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<IData>) => {
  await prisma.$connect();

  return await pipe(
    SearchParam.decode(req.body.data),
    E.fold(
      (l) => {
        res.status(500).json({
          err: `Can't parse this: ${req.body.data}`,
          data: failure(l),
        });
      },
      async (r) => {
        const data = await prisma.tree.findFirst({
          where: { genus: { contains: r.query } },
        });
        res.status(200).json({
          data,
        });
      }
    )
  );
};

export default handler;
