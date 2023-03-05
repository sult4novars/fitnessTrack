import { NextApiRequest, NextApiResponse } from 'next';

export default interface Context {
  req: NextApiRequest & { userId: string; accessToken?: string };
  res: NextApiResponse;
}
