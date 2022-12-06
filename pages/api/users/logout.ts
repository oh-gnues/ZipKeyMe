import { withSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.send(200);
}
export default withSession(handler);
