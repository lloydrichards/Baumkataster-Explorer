// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../config/prisma';

type IData = {
  err?: string;
  data: any;
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<IData>) => {
  try {
    await prisma.$connect();
    const { id } = req.query;

    // console.log(id);

    if (typeof id === 'string') {
      const data = await prisma.tree.findFirst({
        where: {
          id: id || undefined,
        },
      });
      // console.log({ data });
      res.status(200).json({
        data: data,
        status: 'OK',
      });
    } else {
      console.error('invalid id');
      res.status(500).json({
        data: {},
        status: 'Invalid ID',
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
