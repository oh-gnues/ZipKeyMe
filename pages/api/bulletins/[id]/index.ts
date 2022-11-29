import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/server/apiHandler";
import client from "@libs/server/client";
import { withSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const post = await client.post.findUnique({
    where: {
      postId: +id!,
    },
    include: {
      reples: {
        include: {
          users: {
            select: { name: true },
          },
        },
      },
      users: {
        select: { name: true },
      },
      _count: {
        select: { likes: true, reples: true },
      },
    },
  });
  return res.json({ ok: true, post });
}

export default withSession(
  apiHandler({
    method: ["GET"],
    handler,
    isPrivate: true,
  })
);
