// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../config/prisma';

type IData = {
  err?: string;
  data: any;
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<IData>) => {
  await prisma.$connect();
  const { id } = req.query;

  if (typeof id === 'string') {
    const data = await prisma.tree.findFirst({
      where: {
        id: id || undefined,
      },
    });
    console.log(data);
    res.status(200).json({
      data: data,
      status: 'OK',
    });
  } else {
    res.status(500).json({
      data: {},
      status: 'Invalid ID',
    });
  }
};

export default handler;
