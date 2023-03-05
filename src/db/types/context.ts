import { NextApiRequest, NextApiResponse } from 'next';

export type Context = {
  req: NextApiRequest & { userId: string; accessToken?: string };
  res: NextApiResponse;
};
