import { withSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
  }
  if (req.method == "DELETE") {
  }
}
export default withSession(
  apiHandler({
    method: ["POST", "DELETE"],
    handler,
    isPrivate: true,
  })
);
