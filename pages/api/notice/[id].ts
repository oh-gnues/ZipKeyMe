import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const notice = await client.post.findUnique({
    where: {
      postId: +id!,
    },
  });
  return res.json({ ok: true, notice });
}

export default withSession(
  apiHandler({
    method: ["GET"],
    handler,
    isPrivate: false,
  })
);
